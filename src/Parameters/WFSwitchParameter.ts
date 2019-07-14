import { ConvertingContext } from "../Converter";
import { AsAble } from "../ParserData";

import { WFParameter } from "./WFParameter";

import { ShortcutsSwitchParameterSpec } from "../Data/ActionDataTypes/ShortcutsParameterSpec";

export class WFSwitchParameter extends WFParameter {
	_data: ShortcutsSwitchParameterSpec;
	constructor(
		data: ShortcutsSwitchParameterSpec,
		name = "Switch",
		docs = "https://pfgithub.github.io/shortcutslang/gettingstarted#switch-or-expanding-or-boolean-fields"
	) {
		super(data, name, docs);
		this._data = data;
	}
	genDocsArgName() {
		return this.allowsVariables
			? `(true | false | variable)`
			: `(true | false)`;
	}
	genDocs() {
		return `${super.genDocs()}

Accepts a boolean${
			this.allowsVariables
				? `
or a variable.`
				: ""
		}`;
	}
	build(cc: ConvertingContext, parse: AsAble) {
		if (parse.canBeVariable(cc)) {
			if (!this.allowsVariables) {
				throw parse.error(
					cc,
					"This toggle switch field does not accept variables."
				);
			}
			return parse.asVariable(cc);
		} else if (parse.canBeBoolean(cc)) {
			return parse.asBoolean(cc);
		}
		throw parse.error(
			cc,
			"Toggle switch fields only accept booleans (true/false) and variables."
		);
	}
}
