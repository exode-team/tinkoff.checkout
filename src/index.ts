import debug from 'debug';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import axios from 'axios';
import {
  AddCustomerRequest,
  AddCustomerResponse,
  CancelPaymentRequest,
  CancelPaymentResponse,
  ChargeRequest,
  ChargeResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  GetCardListRequest,
  GetCardListResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  InitPaymentRequest,
  InitPaymentResponse,
  PaymentStateRequest,
  PaymentStateResponse,
  RemoveCustomerRequest,
  RemoveCustomerResponse,
  Request,
  ResendPaymentRequest,
  ResendPaymentResponse,
  Response,
} from './types/index';


/**
 * Tinkoff API connector
 */
export default class TinkoffAPI {
  /**
   * Tinkoff API endpoint
   */
  private readonly apiUrl: string;

  /**
   * Timeout for request
   */
  private readonly timeout: number;

  /**
   * Tinkoff terminal key
   */
  private readonly terminalKey: string;

  /**
   * Tinkoff secret key
   */
  private readonly secretKey: string;

  /**
   * Constructor
   *
   * @param terminalKey - unique terminal identifier
   * @param secretKey - secret terminal key
   */
  constructor(terminalKey: string, secretKey: string) {
    // Api endpoint
    this.apiUrl = 'https://securepay.tinkoff.ru/v2/';
    // Access timeout in milliseconds (10 seconds)
    this.timeout = 10000;

    this.terminalKey = terminalKey;
    this.secretKey = secretKey;

    debug(`Initialized with terminalKey=${this.terminalKey}`);
  }

  /**
   * Initialize the payment
   *
   * @param params - params for Init method except TerminalKey and Token
   */
  public async initPayment(params: InitPaymentRequest): Promise<InitPaymentResponse | undefined> {
    try {
      TinkoffAPI.checkInitPayment(params);

      return (await this.requestMethod('Init', params)) as InitPaymentResponse;
    } catch (error) {
      debug(`${error}`);
    }
  }

  /**
   * Add customer to the shop
   *
   * @param params - params for add customer method
   */
  public async addCustomer(params: AddCustomerRequest): Promise<AddCustomerResponse> {
    return (await this.requestMethod('AddCustomer', params)) as AddCustomerResponse;
  }

  /**
   * Get customer info
   *
   * @param params - params for get customer request
   */
  public async getCustomer(params: GetCustomerRequest): Promise<GetCustomerResponse> {
    return (await this.requestMethod('GetCustomer', params)) as GetCustomerResponse;
  }

  /**
   * Remove customer
   *
   * @param params - params for remove customer request
   */
  public async removeCustomer(params: RemoveCustomerRequest): Promise<RemoveCustomerResponse> {
    return (await this.requestMethod('RemoveCustomer', params)) as RemoveCustomerResponse;
  }

  /**
   * Get customer's cards info
   *
   * @param params - params for get customer's cards request
   */
  public async getCardList(params: GetCardListRequest): Promise<GetCardListResponse> {
    return (await this.requestMethod('GetCardList', params)) as GetCardListResponse;
  }

  /**
   * Charge
   *
   * @param params - params for charge request
   */
  public async charge(params: ChargeRequest): Promise<ChargeResponse> {
    return (await this.requestMethod('Charge', params)) as ChargeResponse;
  }

  /**
   * Confirm 2-staged payment
   *
   * @param params - params for Confirm method except TerminalKey and Token
   */
  public async confirmPayment(params: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    return (await this.requestMethod('Confirm', params)) as ConfirmPaymentResponse;
  }

  /**
   * Cancel 2-staged payment
   *
   * @param params - params for Cancel method except TerminalKey and Token
   */
  public async cancelPayment(params: CancelPaymentRequest): Promise<CancelPaymentResponse> {
    return (await this.requestMethod('Cancel', params)) as CancelPaymentResponse;
  }

  /**
   * Get state of payment
   *
   * @param params - params for GetState method except TerminalKey and Token
   */
  public async paymentState(params: PaymentStateRequest): Promise<PaymentStateResponse> {
    return (await this.requestMethod('GetState', params)) as PaymentStateResponse;
  }

  /**
   * Resend unprocessed notifications
   *
   * @param params - params for Resend method except TerminalKey and Token
   */
  public async resendPayment(params: ResendPaymentRequest): Promise<ResendPaymentResponse> {
    return (await this.requestMethod('Resend', params)) as ResendPaymentResponse;
  }

  /**
   * Generate signature token
   * Docs: https://oplata.tinkoff.ru/develop/api/request-sign/
   *
   * @param params - method parameters (key-value) excluding Receipt and DATA
   */
  public generateToken(params: Request): string {
    let tokenParams: Request & {Password?: string} = {
      ...params,
    };

    if ('Receipt' in tokenParams) {
      delete tokenParams.Receipt;
    }
    if ('DATA' in tokenParams) {
      delete tokenParams['DATA'];
    }
    if ('Token' in tokenParams) {
      delete tokenParams['Token'];
    }

    tokenParams = {
      ...tokenParams,
      Password: this.secretKey,
    };
    const pairs = _.toPairs(tokenParams);
    const sortedPairs = _.sortBy(pairs, pair => pair[0]);
    const concatenatedValues = _.reduce(
      sortedPairs,
      (result, pair) => result + pair[1],
      ''
    );

    const token = crypto
      .createHash('sha256')
      .update(concatenatedValues)
      .digest('hex');

    debug(`generateToken digest is ${token}`);

    return token;
  }

  /**
   * Request API method
   *
   * @param methodName - method name
   * @param params - params for method except TerminalKey and Token
   */
  private async requestMethod(methodName: string, params: Request): Promise<Response> {
    const methodUrl = `${this.apiUrl}${methodName}`;
    const methodParams = {
      ...params,
      TerminalKey: this.terminalKey,
    };

    methodParams.Token = this.generateToken(methodParams);

    debug(`Send '${methodName}' with ${methodParams}`);

    const response = await axios.post(methodUrl, methodParams, {
      timeout: this.timeout,
    });

    if (response.status !== 200) {
      throw new Error(
        `[Error code is ${response.status}] ${JSON.stringify(response.data)}`
      );
    }

    if (!response.data.Success) {
      debug(`Error: [${response.data.Message}] ${JSON.stringify(response.data)}`);
    }

    return response.data;
  }

  /**
   * Check parameters for init request
   *
   * @param params - params for check
   */
  private static checkInitPayment(params: InitPaymentRequest): void {
    if (!params.Amount) {
      throw new Error(
        'Not specified `Amount` parameter: order amount as number in kopecks'
      );
    }
  }
}
