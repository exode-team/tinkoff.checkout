/**
 * Init payment request type
 */
export interface GetQrRequest {
    /**
     * Terminal key
     * Added in requestMethod
     */
    TerminalKey?: string;

    /**
     * Unique encryption identifier in the Tinkoff Cashier system
     */
    PaymentId?: number;

    /**
     * Data type
     */
    DataType: 'PAYLOAD' | 'IMAGE';

    /**
     * Sign token
     * See https://oplata.tinkoff.ru/develop/api/request-sign/
     */
    Token?: string;
}

export interface GetQrResponse {
    /**
     * TerminalKey
     */
    TerminalKey: boolean;

    /**
     * Success
     */
    Success: boolean;

    /**
     * Data
     */
    Data: string;

    /**
     * ErrorCode
     */
    ErrorCode: string;

    /**
     * Error Message
     */
    Message: string;

    /**
     * Result Details
     */
    Details: string;

    /**
     * RequestKey
     */
    RequestKey: string;
}
