import { AddCustomerRequest, AddCustomerResponse, CancelPaymentRequest, CancelPaymentResponse, ChargeRequest, ChargeResponse, ConfirmPaymentRequest, ConfirmPaymentResponse, GetCardListRequest, GetCardListResponse, GetCustomerRequest, GetCustomerResponse, GetQrRequest, GetQrResponse, InitPaymentRequest, InitPaymentResponse, PaymentStateRequest, PaymentStateResponse, RemoveCustomerRequest, RemoveCustomerResponse, Request, ResendPaymentRequest, ResendPaymentResponse } from './types/index';
/**
 * Tinkoff checkout API connector
 */
export declare class TinkoffCheckout {
    /**
     * Tinkoff API endpoint
     */
    private readonly apiUrl;
    /**
     * Timeout for request
     */
    private readonly timeout;
    /**
     * Tinkoff terminal key
     */
    private readonly terminalKey;
    /**
     * Tinkoff secret key
     */
    private readonly secretKey;
    /**
     * Constructor
     *
     * @param terminalKey - unique terminal identifier
     * @param secretKey - secret terminal key
     */
    constructor(terminalKey: string, secretKey: string);
    /**
     * Initialize the payment
     *
     * @param params - params for Init method except TerminalKey and Token
     */
    initPayment(params: InitPaymentRequest): Promise<InitPaymentResponse | undefined>;
    /**
     * Add customer to the shop
     *
     * @param params - params for add customer method
     */
    addCustomer(params: AddCustomerRequest): Promise<AddCustomerResponse>;
    /**
     * Get customer info
     *
     * @param params - params for get customer request
     */
    getCustomer(params: GetCustomerRequest): Promise<GetCustomerResponse>;
    /**
     * Remove customer
     *
     * @param params - params for remove customer request
     */
    removeCustomer(params: RemoveCustomerRequest): Promise<RemoveCustomerResponse>;
    /**
     * Get customer's cards info
     *
     * @param params - params for get customer's cards request
     */
    getCardList(params: GetCardListRequest): Promise<GetCardListResponse>;
    /**
     * Charge
     *
     * @param params - params for charge request
     */
    charge(params: ChargeRequest): Promise<ChargeResponse>;
    /**
     * Confirm 2-staged payment
     *
     * @param params - params for Confirm method except TerminalKey and Token
     */
    confirmPayment(params: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse>;
    /**
     * Cancel 2-staged payment
     *
     * @param params - params for Cancel method except TerminalKey and Token
     */
    cancelPayment(params: CancelPaymentRequest): Promise<CancelPaymentResponse>;
    /**
     * Get state of payment
     *
     * @param params - params for GetState method except TerminalKey and Token
     */
    paymentState(params: PaymentStateRequest): Promise<PaymentStateResponse>;
    /**
     * Resend unprocessed notifications
     *
     * @param params - params for Resend method except TerminalKey and Token
     */
    resendPayment(params: ResendPaymentRequest): Promise<ResendPaymentResponse>;
    /**
     * Get payment QR
     *
     * @param params - params for Init method except TerminalKey and Token
     */
    getQr(params: GetQrRequest): Promise<GetQrResponse | undefined>;
    /**
     * Generate signature token
     * Docs: https://oplata.tinkoff.ru/develop/api/request-sign/
     *
     * @param params - method parameters (key-value) excluding Receipt and DATA
     */
    generateToken(params: Request): string;
    /**
     * Request API method
     *
     * @param methodName - method name
     * @param params - params for method except TerminalKey and Token
     */
    private requestMethod;
    /**
     * Check parameters for init request
     *
     * @param params - params for check
     */
    private static checkInitPayment;
}
