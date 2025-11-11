import React from 'react';
import Rule from "../Rule";

export default class RuleMoonPhase extends Rule {
    constructor(moonEmoji) {
        super("Your password must include the current phase of the moon as an emoji.");
        
        this.moonEmoji = moonEmoji ? moonEmoji.trim() : 'ERROR_NO_MOON';
    }

    check(txt) {
        if (this.moonEmoji === 'ERROR_NO_MOON') return false;
        return txt.includes(this.moonEmoji);
    }
}