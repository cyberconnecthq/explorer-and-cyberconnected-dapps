// Interfaces

// Current supported connection label
// CyberConnection -> Connection is valid when you have followed or following or both
// Transfer -> Connectino is valid when you have either sent or receive
export type ConnectionLabel = 'CyberConnect' | 'Transfer' | 'OpenSea';

// Current identified connection type - 'sent' | 'received' | 'following' etc...
export type SourceConnectionType = TransferConnectionType | CyberConnectConnectionType | string;
export type TransferConnectionType = 'sent' | 'received';
export type CyberConnectConnectionType = 'following' | 'followed' | 'friend';

// Describes a connection profile
// profile - contains a list of all connections linked to the address
export type ConnectionProfile = {
  address: string;
  domain?: string;
  images?: string[];
  followerCount: string;
  balance?: string;
  followingCount: string;
  connections?: SourceConnection[];
};

// Source information for a profile
export type SourceConnection = {
  address: string;
  link: string; // redirection link
  type: { 
    description: SourceConnectionType,
    label: ConnectionLabel;
  };
  payload?: any; // Addtional payload for this connections
};

// Props for finding a connection
// Such as timestamp - If we only wanna to understand a connection between a specfic time
export type ISourceConnectionProps = {
  address: string;
  pageSize?: number;
  offset?: number;
}

