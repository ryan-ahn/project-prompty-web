/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : styled.d
 */

import 'styled-components';
import { minMedia, maxMedia, mixMedia } from './theme';
import { flexSet, boxSet, backgroundSet, fontSet, colorSet } from './mixin';
import { colors } from './colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    minMedia: typeof minMedia;
    maxMedia: typeof maxMedia;
    mixMedia: typeof mixMedia;
    flexSet: typeof flexSet;
    boxSet: typeof boxSet;
    fontSet: typeof fontSet;
    colorSet: typeof colorSet;
    backgroundSet: typeof backgroundSet;
  }
}
