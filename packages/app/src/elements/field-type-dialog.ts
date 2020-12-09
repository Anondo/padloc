import { FieldDef, FIELD_DEFS } from "@padloc/core/src/item";
import { translate as $l } from "@padloc/locale/src/translate";
import { element, html, css } from "./base";
import { Dialog } from "./dialog";
import "./button";
import "./scroller";

@element("pl-field-type-dialog")
export class FieldTypeDialog extends Dialog<void, FieldDef> {
    static styles = [
        ...Dialog.styles,
        css`
            .inner {
                max-width: 440px;
            }
        `,
    ];

    renderContent() {
        return html`
            <header class="spacing padded center-aligning horizontal layout background">
                <div class="large horizontally-padded stretch">${$l("Choose A Field Type")}</div>
                <pl-button class="transparent slim round" @click=${this.dismiss}>
                    <pl-icon icon="cancel"></pl-icon>
                </pl-button>
            </header>

            <pl-scroller class="stretch">
                <div class="text-centering subtle">${$l("What kind of field you would like to add?")}</div>
                <div class="margined grid">
                    ${[...Object.values(FIELD_DEFS)].map(
                        (fieldDef) => html`
                            <pl-button
                                class="center-aligning text-left-aligning spacing horizontal layout"
                                @click=${() => this.done(fieldDef)}
                            >
                                <pl-icon icon=${fieldDef.icon} class="icon"></pl-icon>
                                <div class="stretch ellipsis">${fieldDef.name}</div>
                            </pl-button>
                        `
                    )}
                </div>
            </pl-scroller>
        `;
    }
}
