/**
 * Get customer request type
 */
export interface GetCustomerRequest {
    /**
     * Terminal key
     * Added in requestMethod but always required
     */
    TerminalKey?: string;

    /**
     * Buyer's identifier in the seller's system
     */
    CustomerKey: string;

    /**
     * IP address of buyer
     */
    IP?: string;

    /**
     * Sign token
     * See https://oplata.tinkoff.ru/develop/api/request-sign/
     */
    Token?: string;
}

/**
 * Get customer response type
 */
export interface GetCustomerResponse {
    /**
     * Terminal key
     */
    TerminalKey: string;

    /**
     * Buyer's identifier in the seller's system
     */
    CustomerKey: string;

    /**
     * Email of buyer
     */
    Email?: string;

    /**
     * Phone of buyer
     */
    Phone?: string;

    /**
     * Payment execution
     */
    Success: boolean;

    /**
     * Error code
     * 0 is successful
     */
    ErrorCode: string;

    /**
     * Error message
     */
    Message?: string;

    /**
     * Details of error
     */
    Details?: string;
}
