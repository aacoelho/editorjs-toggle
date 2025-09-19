import { BlockToolData } from '@editorjs/editorjs';

/**
 * toggle Tool's input and output data format
 */
export interface toggleData extends BlockToolData {
  title?: string;
  text?: string;
}

/**
 * toggle Tool's configuration object that passed through the initial Editor config
 */
export interface toggleConfig {
  titlePlaceholder?: string;
  textPlaceholder?: string;
}
