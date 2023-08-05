import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    const timestamp =serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp;
    const trigger_alert = ((ratio > upper_bound) || (ratio < lower_bound)) ? ratio : undefined;

    return {
       priceABC,
       priceDEF,
       ratio,
       upper_bound,
       lower_bound,
       timestamp,
       trigger_alert,
    }
  }
}
