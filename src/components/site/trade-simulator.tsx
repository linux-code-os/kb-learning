"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  ShoppingCart,
  Tag,
  X,
  CheckCircle2,
  Activity,
  Download,
  Search,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";
import { demoCoins } from "@/lib/site-data";
import { Sparkline } from "@/components/site/sparkline";
import { useSimulatorStore } from "@/lib/simulator-store";

// Симулированные монеты с начальной ценой
type Coin = {
  symbol: string;
  name: string;
  price: number;
  prevPrice: number;
  change24h: number;
  history: number[]; // последние N цен для sparkline
};

type Holding = {
  symbol: string;
  amount: number;
  avgCost: number; // средняя цена покупки в USD
};

type Order = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit";
  amount: number;
  limitPrice?: number;
  createdAt: number;
};

type TradeRecord = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit";
  amount: number;
  price: number; // цена исполнения
  total: number; // total USD
  balanceAfter: number; // баланс после сделки
  realizedPnl?: number; // реализованная P&L для sell
  executedAt: number;
};

const START_BALANCE = 10000; // виртуальные USD
const HISTORY_LEN = 20; // сколько тиков хранить для sparkline
const TRADE_HISTORY_LEN = 50; // сколько сделок хранить в журнале
const STORAGE_KEY = "kb-simulator-state-v1";

type PersistedState = {
  balance: number;
  holdings: Holding[];
  orders: Order[];
  coins: { symbol: string; price: number; change24h: number; history: number[] }[];
  trades?: TradeRecord[];
};

function formatUsd(n: number, decimals = 2): string {
  if (!isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCoin(n: number): string {
  if (n >= 1) return n.toFixed(4);
  return n.toFixed(8);
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    // Базовая валидация
    if (
      typeof parsed.balance !== "number" ||
      !Array.isArray(parsed.holdings) ||
      !Array.isArray(parsed.orders) ||
      !Array.isArray(parsed.coins)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* приватный режим / квота */
  }
}

export function TradeSimulator() {
  const { lang } = useLang();
  const t = useT();

  // Инициализация монет: все 12 из demoCoins, с восстановлением сохранённых
  // цен/истории из localStorage (если есть). Отображается только coinCount.
  const [coins, setCoins] = React.useState<Coin[]>(() => {
    const saved = loadState();
    const savedMap = new Map(
      saved?.coins?.map((c) => [c.symbol, c] as const) ?? [],
    );
    return demoCoins.map((d) => {
      const s = savedMap.get(d.symbol);
      return {
        symbol: d.symbol,
        name: d.name,
        price: s?.price ?? d.priceUsd,
        prevPrice: s?.price ?? d.priceUsd,
        change24h: s?.change24h ?? (Math.random() - 0.5) * 12,
        history:
          s?.history && s.history.length >= 2 ? s.history : [d.priceUsd],
      };
    });
  });

  const [balance, setBalance] = React.useState<number>(() => {
    const saved = loadState();
    return saved && typeof saved.balance === "number" ? saved.balance : START_BALANCE;
  });
  const [holdings, setHoldings] = React.useState<Holding[]>(() => {
    const saved = loadState();
    return saved?.holdings ?? [];
  });
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const saved = loadState();
    return saved?.orders ?? [];
  });
  const [trades, setTrades] = React.useState<TradeRecord[]>(() => {
    const saved = loadState();
    return saved?.trades ?? [];
  });
  const [selected, setSelected] = React.useState(0);
  const [side, setSide] = React.useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = React.useState<"market" | "limit">("market");
  const [amount, setAmount] = React.useState("");
  const [limitPrice, setLimitPrice] = React.useState("");
  const [toast, setToast] = React.useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [tradeFilter, setTradeFilter] = React.useState<"all" | "buy" | "sell" | string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [coinCount, setCoinCount] = React.useState<6 | 9 | 12>(() => {
    try {
      const saved = localStorage.getItem("kb-sim-coin-count");
      if (saved === "9" || saved === "12") return Number(saved) as 9 | 12;
    } catch {
      /* ignore */
    }
    return 6;
  });

  // Видимые монеты (зависит от coinCount)
  const visibleCoins = coins.slice(0, coinCount);

  // Персистентность: сохраняем состояние при изменениях (debounce 1.5с,
  // чтобы не писать в localStorage на каждый ценовой тик)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      saveState({
        balance,
        holdings,
        orders,
        trades,
        coins: coins.map((c) => ({
          symbol: c.symbol,
          price: c.price,
          change24h: c.change24h,
          history: c.history,
        })),
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [balance, holdings, orders, trades, coins]);

  const currentCoin = visibleCoins[selected] ?? visibleCoins[0];

  // Сохраняем выбор количества монет
  React.useEffect(() => {
    try {
      localStorage.setItem("kb-sim-coin-count", String(coinCount));
    } catch {
      /* ignore */
    }
  }, [coinCount]);

  // Корректируем selected, если он вне диапазона visibleCoins
  React.useEffect(() => {
    if (selected >= coinCount) setSelected(0);
  }, [coinCount, selected]);

  const changeCoinCount = (n: 6 | 9 | 12) => {
    setCoinCount(n);
    if (selected >= n) setSelected(0);
  };

  function showToast(msg: string, type: "ok" | "err") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  function executeOrder(order: Order) {
    const coin = coins.find((c) => c.symbol === order.symbol);
    if (!coin) return;
    const price = order.type === "limit" && order.limitPrice != null ? order.limitPrice : coin.price;
    const cost = price * order.amount;

    // Для sell — считаем реализованную P&L относительно avgCost холдинга
    let realizedPnl: number | undefined;
    if (order.side === "sell") {
      const holding = holdings.find((h) => h.symbol === order.symbol);
      if (holding) {
        realizedPnl = (price - holding.avgCost) * order.amount;
      }
    }

    const newBalance = order.side === "buy" ? balance - cost : balance + cost;

    if (order.side === "buy") {
      setBalance((b) => b - cost);
      setHoldings((prev) => {
        const idx = prev.findIndex((h) => h.symbol === order.symbol);
        if (idx === -1) {
          return [...prev, { symbol: order.symbol, amount: order.amount, avgCost: price }];
        }
        const h = prev[idx];
        const newAmount = h.amount + order.amount;
        const newAvg = (h.avgCost * h.amount + price * order.amount) / newAmount;
        const copy = [...prev];
        copy[idx] = { symbol: order.symbol, amount: newAmount, avgCost: newAvg };
        return copy;
      });
    } else {
      setBalance((b) => b + cost);
      setHoldings((prev) => {
        const idx = prev.findIndex((h) => h.symbol === order.symbol);
        if (idx === -1) return prev;
        const h = prev[idx];
        const newAmount = h.amount - order.amount;
        const copy = [...prev];
        if (newAmount <= 0.00000001) {
          copy.splice(idx, 1);
        } else {
          copy[idx] = { ...h, amount: newAmount };
        }
        return copy;
      });
    }

    // Записываем сделку в журнал
    const record: TradeRecord = {
      id: order.id,
      symbol: order.symbol,
      side: order.side,
      type: order.type,
      amount: order.amount,
      price,
      total: cost,
      balanceAfter: newBalance,
      realizedPnl,
      executedAt: Date.now(),
    };
    setTrades((prev) => [record, ...prev].slice(0, TRADE_HISTORY_LEN));
  }

  // Тикер цен — обновление каждые 2.5 сек
  React.useEffect(() => {
    const id = setInterval(() => {
      setCoins((prev) =>
        prev.map((c) => {
          // случайное изменение ±2.5%
          const drift = (Math.random() - 0.48) * 0.025;
          const newPrice = Math.max(c.price * (1 + drift), 0.0001);
          const newHistory = [...c.history, newPrice].slice(-HISTORY_LEN);
          return {
            ...c,
            prevPrice: c.price,
            price: newPrice,
            change24h: c.change24h + drift * 100,
            history: newHistory,
          };
        }),
      );
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Синхронизация live-цен в shared store (для CrossRates)
  const setStoreCoins = useSimulatorStore((s) => s.setCoins);
  React.useEffect(() => {
    setStoreCoins(
      coins.map((c) => ({ symbol: c.symbol, price: c.price, change24h: c.change24h })),
    );
  }, [coins, setStoreCoins]);

  // Проверка лимитных ордеров при обновлении цен
  React.useEffect(() => {
    if (orders.length === 0) return;
    setOrders((prevOrders) => {
      const remaining: Order[] = [];
      for (const order of prevOrders) {
        if (order.type !== "limit" || order.limitPrice == null) {
          remaining.push(order);
          continue;
        }
        const coin = coins.find((c) => c.symbol === order.symbol);
        if (!coin) {
          remaining.push(order);
          continue;
        }
        const filled =
          (order.side === "buy" && coin.price <= order.limitPrice) ||
          (order.side === "sell" && coin.price >= order.limitPrice);
        if (filled) {
          executeOrder(order);
          showToast(pick({ ru: "Лимитный ордер исполнен", en: "Limit order filled" }, lang), "ok");
        } else {
          remaining.push(order);
        }
      }
      return remaining;
    });
  }, [coins]);

  const onPlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount.replace(/,/g, ".")) || 0;
    if (amt <= 0) {
      showToast(pick({ ru: "Введите количество", en: "Enter an amount" }, lang), "err");
      return;
    }

    const price =
      orderType === "limit" && limitPrice
        ? parseFloat(limitPrice.replace(/,/g, ".")) || 0
        : currentCoin.price;

    if (orderType === "limit" && price <= 0) {
      showToast(pick({ ru: "Введите цену лимита", en: "Enter a limit price" }, lang), "err");
      return;
    }

    const cost = price * amt;

    // Валидация
    if (side === "buy" && cost > balance) {
      showToast(t("sim.insufficientFunds"), "err");
      return;
    }
    if (side === "sell") {
      const holding = holdings.find((h) => h.symbol === currentCoin.symbol);
      if (!holding || holding.amount < amt) {
        showToast(t("sim.insufficientCoins"), "err");
        return;
      }
    }

    const order: Order = {
      id: Math.random().toString(36).slice(2, 9),
      symbol: currentCoin.symbol,
      side,
      type: orderType,
      amount: amt,
      limitPrice: orderType === "limit" ? price : undefined,
      createdAt: Date.now(),
    };

    if (orderType === "market") {
      executeOrder(order);
      showToast(t("sim.orderPlaced"), "ok");
    } else {
      setOrders((prev) => [...prev, order]);
      showToast(t("sim.orderPlaced"), "ok");
    }
    setAmount("");
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    showToast(t("sim.orderCancelled"), "ok");
  };

  const reset = () => {
    setBalance(START_BALANCE);
    setHoldings([]);
    setOrders([]);
    setTrades([]);
    setAmount("");
    setLimitPrice("");
    // Сбрасываем цены к исходным и очищаем историю
    setCoins((prev) =>
      prev.map((c) => {
        const orig = demoCoins.find((d) => d.symbol === c.symbol);
        const basePrice = orig?.priceUsd ?? c.price;
        return {
          ...c,
          price: basePrice,
          prevPrice: basePrice,
          change24h: 0,
          history: [basePrice],
        };
      }),
    );
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    showToast(pick({ ru: "Симулятор сброшен", en: "Simulator reset" }, lang), "ok");
  };

  const exportCsv = () => {
    if (trades.length === 0) return;
    const header = "time,symbol,side,type,amount,price,total,balance_after,realized_pnl\n";
    const rows = trades
      .map((tr) => {
        const time = new Date(tr.executedAt).toISOString();
        const pnl = tr.realizedPnl != null ? tr.realizedPnl.toFixed(2) : "";
        return [
          time,
          tr.symbol,
          tr.side,
          tr.type,
          tr.amount,
          tr.price.toFixed(2),
          tr.total.toFixed(2),
          tr.balanceAfter.toFixed(2),
          pnl,
        ].join(",");
      })
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kb-trades-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(pick({ ru: "CSV экспортирован", en: "CSV exported" }, lang), "ok");
  };

  // Расчёт стоимости активов и P&L
  const holdingsValue = holdings.reduce((sum, h) => {
    const coin = coins.find((c) => c.symbol === h.symbol);
    return sum + (coin ? coin.price * h.amount : 0);
  }, 0);

  const totalCost = holdings.reduce((sum, h) => sum + h.avgCost * h.amount, 0);
  const unrealizedPnl = holdingsValue - totalCost;
  const totalValue = balance + holdingsValue;
  const totalPnl = totalValue - START_BALANCE;

  const pnlPositive = totalPnl >= 0;

  // Фильтрация сделок для журнала (по табу + по текстовому поиску)
  const filteredTrades = React.useMemo(() => {
    let result = trades;
    if (tradeFilter === "buy") result = result.filter((tr) => tr.side === "buy");
    else if (tradeFilter === "sell") result = result.filter((tr) => tr.side === "sell");
    else if (tradeFilter !== "all") result = result.filter((tr) => tr.symbol === tradeFilter);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((tr) => {
        return (
          tr.symbol.toLowerCase().includes(q) ||
          tr.side.toLowerCase().includes(q) ||
          String(tr.amount).includes(q) ||
          String(tr.price).includes(q) ||
          (tr.realizedPnl != null && String(tr.realizedPnl).includes(q))
        );
      });
    }
    return result;
  }, [trades, tradeFilter, searchQuery]);

  // Уникальные символы из сделок для фильтра "по монете"
  const tradeSymbols = React.useMemo(
    () => Array.from(new Set(trades.map((tr) => tr.symbol))),
    [trades],
  );

  return (
    <section id="simulator" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[260px] w-[460px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("sim.eyebrow")}
          title={
            <>
              {t("sim.title1")}{" "}
              <span className="text-gradient-brand">{t("sim.titleAccent")}</span>
            </>
          }
          description={t("sim.desc")}
        />

        {/* Тост */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              role="status"
              aria-live="polite"
              className={`fixed left-1/2 top-20 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-xl ${
                toast.type === "ok"
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
              }`}
            >
              {toast.type === "ok" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Левая колонка — портфель */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/60 bg-card/60 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-bold">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  {t("sim.balance")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t("sim.reset")}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t("sim.balance")}
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums">
                    {formatUsd(balance)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {t("sim.holdingsValue")}
                    </div>
                    <div className="mt-1 font-mono text-sm font-bold tabular-nums">
                      {formatUsd(holdingsValue)}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 ${
                      pnlPositive ? "bg-emerald-500/10" : "bg-rose-500/10"
                    }`}
                  >
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {t("sim.totalPnl")}
                    </div>
                    <div
                      className={`mt-1 font-mono text-sm font-bold tabular-nums ${
                        pnlPositive ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {pnlPositive ? "+" : ""}
                      {formatUsd(totalPnl)} ({pnlPositive ? "+" : ""}
                      {((totalPnl / START_BALANCE) * 100).toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Холдинги */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("sim.holding")}
                </div>
                {holdings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("sim.emptyPortfolio")}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {holdings.map((h) => {
                      const coin = coins.find((c) => c.symbol === h.symbol);
                      const value = coin ? coin.price * h.amount : 0;
                      const pnl = value - h.avgCost * h.amount;
                      const pos = pnl >= 0;
                      return (
                        <li
                          key={h.symbol}
                          className="flex items-center justify-between gap-2 rounded-lg bg-muted/30 px-3 py-2"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">{h.symbol}</div>
                            <div className="font-mono text-[11px] text-muted-foreground tabular-nums">
                              {formatCoin(h.amount)} @ {formatUsd(h.avgCost)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-sm font-semibold tabular-nums">
                              {formatUsd(value)}
                            </div>
                            <div
                              className={`font-mono text-[11px] tabular-nums ${
                                pos ? "text-emerald-500" : "text-rose-500"
                              }`}
                            >
                              {pos ? "+" : ""}
                              {formatUsd(pnl)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Открытые ордера */}
              {orders.length > 0 && (
                <div className="mt-4 border-t border-border/60 pt-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sim.orders")} ({orders.length})
                  </div>
                  <ul className="space-y-2">
                    {orders.map((o) => (
                      <li
                        key={o.id}
                        className="flex items-center justify-between gap-2 rounded-lg border border-border/50 px-3 py-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              o.side === "buy"
                                ? "bg-emerald-500/15 text-emerald-500"
                                : "bg-rose-500/15 text-rose-500"
                            }
                          >
                            {o.side === "buy" ? t("sim.buy") : t("sim.sell")}
                          </Badge>
                          <span className="font-semibold">{o.symbol}</span>
                          <span className="font-mono tabular-nums text-muted-foreground">
                            {formatCoin(o.amount)}
                          </span>
                          {o.limitPrice != null && (
                            <span className="font-mono tabular-nums text-muted-foreground">
                              @ {formatUsd(o.limitPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => cancelOrder(o.id)}
                          className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500"
                          aria-label={t("sim.cancel")}
                        >
                          <X className="h-3 w-3" />
                          {t("sim.cancel")}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Журнал сделок */}
              <div className="mt-4 border-t border-border/60 pt-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sim.tradeHistory")} ({trades.length})
                  </span>
                  {trades.length > 0 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={exportCsv}
                        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition hover:text-emerald-500"
                        aria-label={t("sim.exportCsv")}
                      >
                        <Download className="h-3 w-3" />
                        {t("sim.exportCsv")}
                      </button>
                      <button
                        onClick={() => setTrades([])}
                        className="text-[11px] text-muted-foreground transition hover:text-rose-500"
                      >
                        {t("sim.clearHistory")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Фильтры */}
                {trades.length > 0 && (
                  <div
                    role="group"
                    aria-label={t("sim.filterAll")}
                    className="mb-3 flex flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-1"
                  >
                    <button
                      type="button"
                      onClick={() => setTradeFilter("all")}
                      aria-pressed={tradeFilter === "all"}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                        tradeFilter === "all"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("sim.filterAll")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeFilter("buy")}
                      aria-pressed={tradeFilter === "buy"}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                        tradeFilter === "buy"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("sim.filterBuy")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeFilter("sell")}
                      aria-pressed={tradeFilter === "sell"}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                        tradeFilter === "sell"
                          ? "bg-rose-500/15 text-rose-500"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("sim.filterSell")}
                    </button>
                    {tradeSymbols.map((sym) => (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setTradeFilter(sym)}
                        aria-pressed={tradeFilter === sym}
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium tabular-nums transition ${
                          tradeFilter === sym
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                )}

                {/* Текстовый поиск */}
                {trades.length > 0 && (
                  <div className="relative mb-3">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("sim.searchPlaceholder")}
                      aria-label={t("sim.searchPlaceholder")}
                      className="h-8 w-full rounded-lg border border-border/60 bg-muted/40 pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label={t("sim.clearHistory")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {trades.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("sim.noTrades")}
                  </p>
                ) : filteredTrades.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {tradeFilter !== "all"
                      ? `${t("sim.filteredCount")}: 0`
                      : t("sim.noTrades")}
                  </p>
                ) : (
                  <>
                    {tradeFilter !== "all" && (
                      <p className="mb-2 text-[11px] text-muted-foreground">
                        {t("sim.filteredCount")}: {filteredTrades.length} / {trades.length}
                      </p>
                    )}
                    <ul className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                      {filteredTrades.map((tr) => {
                        const pos = (tr.realizedPnl ?? 0) >= 0;
                        return (
                          <li
                            key={tr.id}
                            className="flex items-center justify-between gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs transition-colors hover:bg-muted/50"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={`shrink-0 ${
                                  tr.side === "buy"
                                    ? "bg-emerald-500/15 text-emerald-500"
                                    : "bg-rose-500/15 text-rose-500"
                                }`}
                              >
                                {tr.side === "buy" ? t("sim.buy") : t("sim.sell")}
                              </Badge>
                              <span className="font-semibold">{tr.symbol}</span>
                              <span className="font-mono tabular-nums text-muted-foreground">
                                {formatCoin(tr.amount)} @ {formatUsd(tr.price, tr.price < 1 ? 4 : 2)}
                              </span>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 text-right">
                              {tr.realizedPnl != null && (
                                <span
                                  className={`font-mono tabular-nums ${
                                    pos ? "text-emerald-500" : "text-rose-500"
                                  }`}
                                >
                                  {pos ? "+" : ""}
                                  {formatUsd(tr.realizedPnl)}
                                </span>
                              )}
                              <span className="font-mono tabular-nums text-muted-foreground">
                                {new Date(tr.executedAt).toLocaleTimeString(
                                  lang === "ru" ? "ru-RU" : "en-US",
                                  { hour: "2-digit", minute: "2-digit", second: "2-digit" },
                                )}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>

              <p className="mt-5 rounded-xl bg-amber-500/[0.07] p-3 text-[11px] leading-relaxed text-muted-foreground">
                {t("sim.disclaimer")}
              </p>
            </Card>
          </motion.div>

          {/* Правая колонка — рынок + форма ордера */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="border-border/60 bg-card/60 p-6">
              {/* Список монет */}
              <div className="mb-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sim.market")}
                  </span>
                  <div
                    role="group"
                    aria-label={t("sim.coinCount")}
                    className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-muted/40 p-0.5"
                  >
                    {([6, 9, 12] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => changeCoinCount(n)}
                        aria-pressed={coinCount === n}
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums transition ${
                          coinCount === n
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {visibleCoins.map((coin, i) => {
                    const up = coin.price >= coin.prevPrice;
                    const isSel = i === selected;
                    return (
                      <button
                        key={coin.symbol}
                        onClick={() => setSelected(i)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          isSel
                            ? "border-emerald-500/50 bg-emerald-500/[0.07] ring-1 ring-emerald-500/30"
                            : "border-border/60 bg-muted/30 hover:border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{coin.symbol}</span>
                          {up ? (
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                          )}
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-1">
                          <span className="font-mono text-xs tabular-nums text-muted-foreground">
                            {formatUsd(coin.price, coin.price < 1 ? 4 : 2)}
                          </span>
                          <Sparkline
                            data={coin.history}
                            width={48}
                            height={18}
                            positive={coin.change24h >= 0}
                          />
                        </div>
                        <div
                          className={`font-mono text-[10px] tabular-nums ${
                            coin.change24h >= 0 ? "text-emerald-500" : "text-rose-500"
                          }`}
                        >
                          {coin.change24h >= 0 ? "+" : ""}
                          {coin.change24h.toFixed(2)}%
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Форма ордера */}
              <form onSubmit={onPlaceOrder} className="space-y-4">
                {/* Buy/Sell tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSide("buy")}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      side === "buy"
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-500"
                        : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t("sim.buy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSide("sell")}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      side === "sell"
                        ? "border-rose-500/50 bg-rose-500/15 text-rose-500"
                        : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Tag className="h-4 w-4" />
                    {t("sim.sell")}
                  </button>
                </div>

                {/* Order type */}
                <Tabs
                  value={orderType}
                  onValueChange={(v) => setOrderType(v as "market" | "limit")}
                >
                  <TabsList className="grid w-full grid-cols-2 rounded-lg border border-border/60 bg-muted/40 p-1">
                    <TabsTrigger
                      value="market"
                      className="rounded-md data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-500"
                    >
                      {t("sim.order.market")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="limit"
                      className="rounded-md data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-500"
                    >
                      {t("sim.order.limit")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Текущая цена */}
                <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{t("sim.price")}</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {formatUsd(currentCoin.price, currentCoin.price < 1 ? 4 : 2)}
                  </span>
                </div>

                {/* Количество */}
                <div className="space-y-2">
                  <label
                    htmlFor="sim-amount"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t("sim.amount")} ({currentCoin.symbol})
                  </label>
                  <Input
                    id="sim-amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="0.00"
                    className="font-mono tabular-nums"
                  />
                </div>

                {/* Лимитная цена */}
                {orderType === "limit" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="sim-limit"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t("sim.limitPrice")} (USD)
                    </label>
                    <Input
                      id="sim-limit"
                      type="text"
                      inputMode="decimal"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value.replace(/[^0-9.,]/g, ""))}
                      placeholder={formatUsd(currentCoin.price, currentCoin.price < 1 ? 4 : 2)}
                      className="font-mono tabular-nums"
                    />
                  </motion.div>
                )}

                {/* Стоимость ордера */}
                {amount && (
                  <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">
                      {side === "buy" ? t("sim.value") : t("sim.value")}
                    </span>
                    <span className="font-mono font-semibold tabular-nums">
                      {formatUsd(
                        (orderType === "limit" && limitPrice
                          ? parseFloat(limitPrice.replace(/,/g, ".")) || 0
                          : currentCoin.price) * (parseFloat(amount.replace(/,/g, ".")) || 0),
                      )}
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  className={`h-11 w-full gap-2 rounded-full text-white shadow-lg transition-all hover:-translate-y-0.5 ${
                    side === "buy"
                      ? "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-500"
                      : "bg-rose-600 shadow-rose-600/20 hover:bg-rose-500"
                  }`}
                >
                  {side === "buy" ? <ShoppingCart className="h-4 w-4" /> : <Tag className="h-4 w-4" />}
                  {t("sim.placeOrder")} · {currentCoin.symbol}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
