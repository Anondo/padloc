import { css } from "lit-element";

export const base = css`
    :host {
        font-family: inherit;
    }

    [hidden] {
        display: none !important;
    }

    [invisible] {
        opacity: 0;
    }

    [disabled] {
        opacity: 0.5;
        pointer-events: none !important;
    }

    code {
        font-family: var(--font-family-mono);
    }

    strong {
        font-weight: bold;
    }

    h1 {
        font-size: var(--font-size-huge);
    }

    h2 {
        font-size: var(--font-size-big);
    }

    .text-centering {
        text-align: center;
    }

    .text-left-aligning {
        text-align: left;
    }

    .text-right-aligning {
        text-align: right;
    }

    .tiny {
        font-size: var(--font-size-tiny);
    }

    .small {
        font-size: var(--font-size-small);
    }

    .large {
        font-size: var(--font-size-large);
    }

    .huge {
        font-size: var(--font-size-huge);
    }

    .card {
        border-radius: 0.5em;
        background: var(--color-background);
        border: solid 1px var(--color-shade-1);
        border-bottom-width: 3px;
        margin: 0.5em;
    }

    .blue {
        --color-foreground: var(--color-blue);
    }

    .red {
        --color-background: var(--color-white);
        --color-foreground: var(--color-red);
        color: var(--color-foreground);
        background: var(--color-background);
    }

    .inverted {
        background: var(--color-foreground);
        color: var(--color-background);
    }

    .bold {
        font-weight: bold;
    }

    .subtle {
        opacity: 0.7;
    }

    .faded {
        opacity: 0.5;
    }

    .rounded {
        border-radius: 0.5em;
    }
`;