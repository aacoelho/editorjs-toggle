/**
 * Import styles library
 */
import './index.scss';

/**
 * Import icons
 */
import { IconStar } from '@codexteam/icons';

/**
 * Import types
 */
import { toggleData, toggleConfig } from './types';
import { API, BlockAPI, BlockTool } from '@editorjs/editorjs';

/**
 * toggle Tool for Editor.js
 */
export default class toggle implements BlockTool {
  /**
   * Code API — public methods to work with Editor
   * 
   * @link https://editorjs.io/api
   */
  private readonly api: API;

  /**
   * Block API — methods and properties to work with Block instance
   * 
   * @link https://editorjs.io/blockapi
   */
  private readonly block: BlockAPI;

  /**
   * Read-only mode flag
   */
  private readonly readOnly: boolean;

  /**
   * Tool data for input and output
   */
  private _data!: toggleData;

  /**
   * Configuration object that passed through the initial Editor configuration.
   */
  private config: toggleConfig;

  /**
   * Tool's HTML nodes
   */
  private nodes: {[key: string]: HTMLElement|null};

  /**
   * Title input placeholder
   */
  private titlePlaceholder: string;

  /**
   * Description input placeholder
   */
  private textPlaceholder: string;

  /**
   * Class constructor
   * 
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({ data, config, api, block, readOnly }: { data: toggleData, config: toggleConfig, api: API, block: BlockAPI, readOnly: boolean }) {
    this.data = data;
    this.config = config;
    this.api = api;
    this.block = block;
    this.readOnly = readOnly;

    this.titlePlaceholder = config.titlePlaceholder || 'Add title';
    this.textPlaceholder = config.textPlaceholder || 'Add text';

    /**
     * Declare Tool's nodes
     */
    this.nodes = {
      wrapper: null,
      title: null,
      text: null,
    };
  }

  /**
   * Class names
   *
   * @returns {Object}
   */
  get classes() {
    return {
      wrapper: 'cdx-toggle',
      title: 'cdx-toggle__title',
      text: 'cdx-toggle__text',
    };
  }

  /**
   * Data setter
   * @param {toggleData} data - Raw data to store (Editor.js handles sanitization automatically)
   */
  set data(data: toggleData) {
    this._data = Object.assign({}, {
      title: data.title || "",
      text: data.text || "",
    });
  }
  
  /**
   * Data getter
   * @returns {toggleData} Current tool data
   */
  get data(): toggleData {
    return this._data;
  }

  /**
   * PUBLIC METHODS
   * 
   * @link https://editorjs.io/tools-api#public-methods
   */

  /**
   * Creates UI of a Block
   * Required
   * @link https://editorjs.io/tools-api#render
   * 
   * @returns {HTMLElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', this.classes.wrapper);

    // Title input
    this.nodes.title = this.make('div', this.classes.title, {
      contentEditable: !this.readOnly ? 'true' : 'false',
      innerHTML: this._data.title || '',
    });
    this.nodes.title.dataset.placeholder = this.titlePlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.title);

    // Description input
    this.nodes.text = this.make('div', this.classes.text, {
      contentEditable: !this.readOnly ? 'true' : 'false',
      innerHTML: this._data.text || '',
    });
    this.nodes.text.dataset.placeholder = this.textPlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.text);

    return this.nodes.wrapper;
  }

  /**
   * Extracts Block data from the UI
   * Required
   * @link https://editorjs.io/tools-api#save
   * 
   * @returns {toggleData} saved data
   */
  save(): toggleData {
    return {
      title: this.getCleanContent(this.nodes.title?.innerHTML || ''),
      text: this.getCleanContent(this.nodes.text?.innerHTML || ''),
    };
  }

  /**
   * Validates Block data after saving
   * @link https://editorjs.io/tools-api#validate
   * 
   * @param {toggleData} savedData
   * @returns {boolean} true if data is valid, otherwise false
   */ 
  validate(savedData: toggleData): boolean {
    // Require at least a value or title to be present
    return !!(savedData.title?.trim() || savedData.text?.trim());
  }

  /**
   * 
   * Returns HTML that will be appended at the top of Block-settings
   * @link https://editorjs.io/tools-api#render-settings
   * 
   * @returns {HTMLElement}
   */ 
  // renderSettings() {}

  /**
   * Clear Tools stuff: cache, variables, events.
   * Called when Editor instance is destroying.
   * @link https://editorjs.io/tools-api#destroy
   * 
   * @returns {void}
   */
  // destroy() {}

  /**
   * Handle content pasted by ways that described by pasteConfig static getter
   * @link https://editorjs.io/tools-api#on-paste
   * 
   * @param {PasteEvent} event - event with pasted content
   * @returns {void}
   */  
  // onPaste() {}

  /**
   * Specifies how to merge two similar Blocks
   * @link https://editorjs.io/tools-api#merge
   * 
   * @param {toggleData} data - data of second Block
   * @returns {toggleData} - merged data
   */
  // merge() {} 

  /**
   * STATIC GETTERS
   * 
   * @link https://editorjs.io/tools-api#static-getters
   */

  /**
   * Process pasted content before appending to the Editor
   * @link https://editorjs.io/tools-api#pasteconfig
   * 
   * @returns {tags?: string[], files?: { mimeTypes: string[], extensions: string[] }, patterns?: { [string]: RegEx }}
   */ 
  // static get pasteConfig() {
  //   return {
  //     /**
  //      * Paste HTML into Editor
  //      */
  //     tags: [],
    
  //     /**
  //      * Paste URL of media into the Editor
  //      */
  //     patterns: {},
    
  //     /**
  //      * Drag n drop file from into the Editor
  //      */
  //     files: {
  //       mimeTypes: [ ],
  //     },
  //   };
  // }

  /**
   * Clean unwanted HTML tags or attributes
   * @link https://editorjs.io/tools-api#sanitize
   * 
   * @returns {{[string]: boolean|object}} - Sanitizer rules
   */
  static get sanitize() {
    return {
      title: true,      // Allow all inline formatting in titles
      text: true, // Allow all inline formatting in texts
    };
  } 

  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   * 
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: IconStar,
    };
  }

  /**
   * Shortcut that fires render method and inserts new Block
   * @link https://editorjs.io/tools-api#shortcut
   * 
   * @returns {string}
   */
  // static get shortcut() {
  //   // return 'CMD+SHIFT+I';
  // }

  /**
   * Config allows Tool to specify how it can be converted into/from another Tool
   * 
   * @link https://editorjs.io/tools-api#conversionconfig
   * 
   * @returns {{export: string|function, import: string|function}}
   */
  // static get conversionConfig() {
  //   // return {
  //   //   export: (data) => {
  //   //     return data.items.join('.'); // in this example, all list items will be concatenated to an export string
  //   //   },
  //   //  
  //   //   /**
  //   //    * In this example, List Tool creates items by splitting original text by a dot symbol. 
  //   //    */
  //   //   import: (string) => {
  //   //     const items = string.split('.');
  //   //
  //   //     return {
  //   //       items: items.filter( (text) => text.trim() !== ''),
  //   //       type: 'unordered'
  //   //     };
  //   //   }
  //   // };
  // }

  /**
   * With this option, Editor.js won't handle Enter keydowns
   * @link https://editorjs.io/tools-api#enablelinebreaks
   * 
   * @returns {boolean}
   */ 
  // static get enableLineBreaks() {
  //   return true;
  // }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   * 
   * @returns {boolean}
   */
  // static get isReadOnlySupported() {
  //   return true;
  // } 

  /**
   * LIFE CYCLE HOOKS
   * 
   * These methods are called by Editor.js core
   * @link https://editorjs.io/tools-api#lifecycle-hooks
   */

  /**
   * Called after Block contents is added to the page
   */
  // rendered() {}

  /**
   * Called each time Block contents is updated
   */
  // updated() {}

  /**
   * Called after Block contents is removed from the page but before Block instance deleted
   */
  // removed() {}

  /**
   * Called after Block is moved by move tunes or through API
   * 
   * @param {MoveEvent} event 
   */
  // moved(event) {}


  /**
   * HELPER METHODS
   */

  /**
   * Clean HTML content and return empty string for "empty" content
   * 
   * @param {string} content - HTML content to clean
   * @returns {string} - Cleaned content or empty string
   */
  private getCleanContent(content: string): string {
    if (!content) return '';
    
    // Remove common "empty" HTML patterns that browsers insert
    const cleanedContent = content
      .replace(/^<br\/?>$/i, '') // Single <br> or <br/>
      .replace(/^<p><br\/?>?<\/p>$/i, '') // <p><br></p> or <p><br/></p>
      .replace(/^<div><br\/?>?<\/div>$/i, '') // <div><br></div> or <div><br/></div>
      .replace(/^\s*$/, ''); // Whitespace only
    
    return cleanedContent;
  }

  /**
   * Helper for creating DOM elements
   * @param {string} tagName - Element tag name
   * @param {string|string[]} classNames - Class names to add
   * @param {object} attributes - Attributes to set
   * @returns {HTMLElement}
   */
  private make(tagName: string, classNames: string | string[] = [], attributes: Record<string, any> = {}): HTMLElement {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      (el as any)[attrName] = attributes[attrName];
    }

    return el;
  }
};
