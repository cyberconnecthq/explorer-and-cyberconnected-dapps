import { useQuery, UseQueryResult } from 'react-query';

export interface ICovalentGetTransactionsForAddress {
    data:          ICovalentGetTransactionsForAddressData;
    error:         boolean;
    error_message: string;
    error_code:    number;
}

export interface ICovalentGetTransactionsForAddressData {
    address:        string;
    updated_at:     Date;
    next_update_at: Date;
    quote_currency: string;
    chain_id:       number;
    items:          Item[];
    pagination:     Pagination;
}

export interface Item {
    block_signed_at:    Date;
    block_height:       number;
    tx_hash:            string;
    tx_offset:          number;
    successful:         boolean;
    from_address:       string;
    from_address_label: null;
    to_address:         string;
    to_address_label:   null;
    value:              string;
    value_quote:        number;
    gas_offered:        number;
    gas_spent:          number;
    gas_price:          number;
    gas_quote:          number;
    gas_quote_rate:     number;
    log_events:         LogEvent[];
}

export interface LogEvent {
    block_signed_at:               Date;
    block_height:                  number;
    tx_offset:                     number;
    log_offset:                    number;
    tx_hash:                       string;
    raw_log_topics:                string[];
    sender_contract_decimals:      number;
    sender_name:                   null | string;
    sender_contract_ticker_symbol: null | string;
    sender_address:                string;
    sender_address_label:          null;
    sender_logo_url:               string;
    raw_log_data:                  null | string;
    decoded:                       Decoded | null;
}

export interface Decoded {
    name:      string;
    signature: string;
    params:    Param[] | null;
}

export interface Param {
    name:    string;
    type:    Type;
    indexed: boolean;
    decoded: boolean;
    value:   boolean | null | string;
}

export enum Type {
    Address = "address",
    Bool = "bool",
    Bytes = "bytes",
    Bytes32 = "bytes32",
    Bytes4 = "bytes4",
    Int24 = "int24",
    Int256 = "int256",
    String = "string",
    Uint112 = "uint112",
    Uint128 = "uint128",
    Uint160 = "uint160",
    Uint256 = "uint256",
    Uint8 = "uint8",
}

export interface Pagination {
    has_more:    boolean;
    page_number: number;
    page_size:   number;
    total_count: null | number;
}

export async function covalentGetTransactionsForAddress(address: string): Promise<ICovalentGetTransactionsForAddressData> {
    if (address === undefined)
        return Promise.reject("Address undefined");

    const response = await fetch(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`)
    if (!response.ok) {
        return Promise.reject("Problem fetching data");
    }
    const result = await response.json();
    return result.data;
}

export type CovalentTransactionsForAddressResp = UseQueryResult<ICovalentGetTransactionsForAddressData, unknown>;

export function useCovalentTransactionsForAddress(address: string | null) :CovalentTransactionsForAddressResp {
    return useQuery<ICovalentGetTransactionsForAddressData, Error>(
        ['covalentGetTransactionsForAddress', address],
        () => {
			if(address === null) return Promise.reject('address is null');
            return covalentGetTransactionsForAddress(address)
        },
    );
} 