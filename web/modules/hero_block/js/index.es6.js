const {blocks, data, element, components, blockEditor} = wp;
const {registerBlockType} = blocks;
const {dispatch, select} = data;
const {Fragment} = element;
const {PanelBody, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl, Button, Disabled} = components;
const {InnerBlocks, RichText, InspectorControls, AlignmentToolbar, PanelColorSettings, MediaUpload, BlockControls} = blockEditor;
const __ = Drupal.t;

const HERO_TEMPLATE = [
  ['core/heading', {
    placeholder: 'Hero title',
    content: 'My first Gutenberg block for Drupal',
    customTextColor: '#fff',
    level: 2,
  }],
  ['core/paragraph', {
    placeholder: 'Hero subtitle',
    customTextColor: '#fff',
  }],
  ['core/button', {
    text: 'Read more',
    url: '#',
  }],
];

const HERO_SECTION_CLASSES = "section gb-hero-block";

const settings = {
  title: __('Gutenberg Hero Block'),
  description: __('Hero section with background'),
  icon: 'welcome-view-site',
  multiple: false,
  attributes: {
    align: {
      type: 'string',
      default: 'full'
    },
    backgroundColor: {
      type: 'string',
      default: '#0071b8'
    },
    backgroundImage: {
      type: 'string',
    },
    backgroundHorizontalPosition: {
      type: 'string',
      default: 'center'
    },
    backgroundVerticalPosition: {
      type: 'string',
      default: 'center'
    },
    backgroundOpacity: {
      type: 'number',
      default: 100
    },
    imageId: {
      type: 'number',
    },
    maxWidth: {
      type: 'number',
      default: 1200
    },
    paddingTop: {
      type: 'number',
      default: 150
    },
    paddingBottom: {
      type: 'number',
      default: 150
    },
    paddingLeft: {
      type: 'number',
      default: 50
    },
    paddingRight: {
      type: 'number',
      default: 50
    },
  },
  edit({className, attributes, setAttributes, isSelected}) {
    const {imageId, backgroundColor, backgroundOpacity, backgroundImage, backgroundHorizontalPosition, backgroundVerticalPosition, maxWidth, paddingTop, paddingBottom, paddingLeft, paddingRight} = attributes;
    const opacity = backgroundOpacity / 100;
    const backgroundPosition = `${backgroundHorizontalPosition} ${backgroundVerticalPosition}`;

    /* backgroundControls template */
    const backgroundControls = (
      <Fragment>
        <SelectControl label={__('Background Image Vertical Alignment')}
                       value={backgroundVerticalPosition}
                       options={[
                         {
                           label: __('Center'),
                           value: 'center',
                         },
                         {
                           label: __('Top'),
                           value: 'top',
                         },
                         {
                           label: __('Bottom'),
                           value: 'bottom',
                         },
                       ]}
                       onChange={value => setAttributes({backgroundVerticalPosition: value})}
        />
        <SelectControl label={__('Background Image Horizontal Alignment')}
                       value={backgroundHorizontalPosition}
                       options={[
                         {
                           label: __('Center'),
                           value: 'center',
                         },
                         {
                           label: __('Left'),
                           value: 'left',
                         },
                         {
                           label: __('Right'),
                           value: 'right',
                         },
                       ]}
                       onChange={value => setAttributes({backgroundHorizontalPosition: value})}
        />
        <RangeControl label={__('Background Image Opacity')}
                      value={backgroundOpacity}
                      onChange={value => setAttributes({backgroundOpacity: value})}
                      min={0}
                      max={100}
                      step={5}
        />
      </Fragment>
    );

    return (
      <Fragment>
        <div className={className}>
          <BlockControls>
            <Toolbar>
              {backgroundImage ?
                <IconButton
                  className="components-toolbar__remove-image"
                  label={__('Remove background image')}
                  icon="editor-removeformatting"
                  onClick={() => setAttributes({backgroundImage: false})}/>
                :
                <MediaUpload
                  allowedTypes={['image']}
                  onSelect={media => setAttributes({imageId: media.id, backgroundImage: `url(${media.url})`})}
                  value={imageId}
                  render={({open}) => (
                    <IconButton
                      className="components-toolbar__select-image"
                      label={__('Select background image')}
                      icon="format-image"
                      onClick={open}/>
                  )}
                />
              }
            </Toolbar>

          </BlockControls>
          <section className={SECTION_CLASSES}
                   style={{backgroundColor, paddingTop, paddingBottom, paddingLeft, paddingRight}}>
            <div className="gb-hero-block__background" style={{backgroundImage, backgroundPosition, opacity}}></div>
            <div className="gb-hero-block__content" style={{maxWidth}}>
              <InnerBlocks template={TEMPLATE} templateLock={false}/>
            </div>
          </section>
        </div>
        <InspectorControls>
          <PanelBody title={__('Block settings')}>
            {backgroundImage ? backgroundControls : <Disabled style={{opacity: '.5'}}> {backgroundControls} </Disabled>}
            <BaseControl label={__('Content Width in pixels')}>
              <input
                id="gb-hero-block-input-content-width"
                type="number"
                value={maxWidth}
                onChange={ev => setAttributes({maxWidth: parseInt(ev.target.value, 10)})}
                step="5"
              />
            </BaseControl>
            <BaseControl label={__('Content top spacing')}>
              <input
                id="gb-hero-block-input-top-spacing"
                type="number"
                value={paddingTop}
                onChange={e => setAttributes({paddingTop: parseInt(e.target.value, 10)})}
                step="5"
              />
            </BaseControl>
            <BaseControl label={__('Content bottom spacing')}>
              <input
                type="number"
                value={paddingBottom}
                onChange={e => setAttributes({paddingBottom: parseInt(e.target.value, 10)})}
                step="5"
              />
            </BaseControl>
            <BaseControl label={__('Content left spacing')}>
              <input
                type="number"
                value={paddingLeft}
                onChange={e => setAttributes({paddingLeft: parseInt(e.target.value, 10)})}
                step="5"
              />
            </BaseControl>
            <BaseControl label={__('Content right spacing')}>
              <input
                type="number"
                value={paddingRight}
                onChange={e => setAttributes({paddingRight: parseInt(e.target.value, 10)})}
                step="5"
              />
            </BaseControl>
          </PanelBody>
          <PanelColorSettings title={__('Color Settings')}
                              initialOpen={true}
                              colorSettings={[
                                {
                                  value: backgroundColor,
                                  onChange: value => setAttributes({backgroundColor: value}),
                                  label: __('Background Color'),
                                },
                              ]}/>
        </InspectorControls>
      </Fragment>
    );
  },
  save({className, attributes}) {
    const {backgroundColor, backgroundImage, backgroundHorizontalPosition, backgroundVerticalPosition, backgroundOpacity, maxWidth, paddingTop, paddingBottom, paddingLeft, paddingRight} = attributes;
    const opacity = backgroundOpacity / 100;
    const backgroundPosition = `${backgroundHorizontalPosition} ${backgroundVerticalPosition}`;

    return (
      <div className={className}>
        <section className={SECTION_CLASSES}
                 style={{backgroundColor, paddingTop, paddingBottom, paddingLeft, paddingRight}}>
          <div className="gb-hero-block__background" style={{backgroundImage, backgroundPosition, opacity}}></div>
          <div className="gb-hero-block__content" style={{maxWidth}}>
            <InnerBlocks.Content/>
          </div>
        </section>
      </div>
    );
  },
  getEditWrapperProps(attributes) {
    const {align} = attributes;
    return {'data-align': align};
  },
};

const category = {
  slug: 'custom',
  title: __('Custom blocks'),
};

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);

registerBlockType(`${category.slug}/hero-block`, {category: category.slug, ...settings});
