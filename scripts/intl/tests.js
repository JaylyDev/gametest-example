// Script examples for ScriptAPI
// Author: Andy Earnshaw <https://github.com/andyearnshaw/Intl.js>

import Intl from './intl';

const locales = 'en-US'
Intl.Collator(locales).compare('10', '20');
Intl.DateTimeFormat(locales).format(new Date());
Intl.DisplayNames;
Intl.NumberFormat(locales).format(1000000000);
Intl.PluralRules(locales).select(10);
