import { css } from 'lit';

export const hostStyles = css`
    :host {
        width: 100%;
        height: 100%;
    }

    ::slotted(*) {
        width: 100%;
        height: 100%;
    }
`;

export const paddedHostStyles = css`
    :host {
        padding: 20px 10px;
        box-sizing: border-box;
    }
`;

export const hostCentered = css`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
`;

export const centeredStyles = css`
    .centered {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .evenly {
        justify-content: space-evenly;
    }

    .between {
        justify-content: space-between;
    }

    .col {
        flex-direction: column;
    }
`;
