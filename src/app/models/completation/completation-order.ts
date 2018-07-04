import { CompletationPalletPackAction } from './completation-pallet-pack-action';

export class CompletationOrder {
    id: number;
    value: string;
    orderNumber: string;
    distributionCenter: string;
    realiseBy: Date;

    departureRamp: string;
    departureTime: Date;
    departureCarId: string;

    pallets: CompletationPalletPackAction[];

    closed: boolean;
    closedByOperatorId: number;
    closingTimestamp: Date;
    closingSignature: string;
  }
