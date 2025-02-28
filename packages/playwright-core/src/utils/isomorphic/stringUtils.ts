/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// NOTE: this function should not be used to escape any selectors.
export function escapeWithQuotes(text: string, char: string = '\'') {
  const stringified = JSON.stringify(text);
  const escapedText = stringified.substring(1, stringified.length - 1).replace(/\\"/g, '"');
  if (char === '\'')
    return char + escapedText.replace(/[']/g, '\\\'') + char;
  if (char === '"')
    return char + escapedText.replace(/["]/g, '\\"') + char;
  if (char === '`')
    return char + escapedText.replace(/[`]/g, '`') + char;
  throw new Error('Invalid escape char');
}

export function toTitleCase(name: string) {
  return name.charAt(0).toUpperCase() + name.substring(1);
}

export function cssEscape(s: string): string {
  let result = '';
  for (let i = 0; i < s.length; i++)
    result += cssEscapeOne(s, i);
  return result;
}

function cssEscapeOne(s: string, i: number): string {
  // https://drafts.csswg.org/cssom/#serialize-an-identifier
  const c = s.charCodeAt(i);
  if (c === 0x0000)
    return '\uFFFD';
  if ((c >= 0x0001 && c <= 0x001f) ||
      (c >= 0x0030 && c <= 0x0039 && (i === 0 || (i === 1 && s.charCodeAt(0) === 0x002d))))
    return '\\' + c.toString(16) + ' ';
  if (i === 0 && c === 0x002d && s.length === 1)
    return '\\' + s.charAt(i);
  if (c >= 0x0080 || c === 0x002d || c === 0x005f || (c >= 0x0030 && c <= 0x0039) ||
      (c >= 0x0041 && c <= 0x005a) || (c >= 0x0061 && c <= 0x007a))
    return s.charAt(i);
  return '\\' + s.charAt(i);
}

function escapeForRegex(text: string): string {
  return text.replace(/[.*+?^>${}()|[\]\\]/g, '\\$&');
}

export function escapeForTextSelector(text: string | RegExp, exact: boolean, caseSensitive = false): string {
  if (typeof text !== 'string')
    return String(text);
  if (exact)
    return '"' + text.replace(/["]/g, '\\"') + '"';
  if (text.includes('"') || text.includes('>>') || text[0] === '/')
    return `/.*${escapeForRegex(text).replace(/\s+/, '\\s+')}.*/` + (caseSensitive ? '' : 'i');
  return text;
}

export function escapeForAttributeSelector(value: string): string {
  // TODO: this should actually be
  //   cssEscape(value).replace(/\\ /g, ' ')
  // However, our attribute selectors do not conform to CSS parsing spec,
  // so we escape them differently.
  return `"${value.replace(/["]/g, '\\"')}"`;
}
