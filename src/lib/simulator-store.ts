import { create } from "zustand";

/**
 * Shared store для live-цен симулятора.
 * TradeSimulator пишет сюда текущие цены монет при каждом тике,
 * CrossRates читает — чтобы матрица обновлялась в реальном времени.
 *
 * Изолирован от UI-state симулятора (balance/holdings/orders/trades),
 * чтобы не вызывать лишние ре-рендеры CrossRates при каждой сделке.
 */

export type LiveCoin = {
  symbol: string;
  price: number;
  change24h: number;
};

type SimulatorStore = {
  coins: LiveCoin[];
  setCoins: (coins: LiveCoin[]) => void;
};

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  coins: [],
  setCoins: (coins) => set({ coins }),
}));
