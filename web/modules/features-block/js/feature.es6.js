const {blocks, data, element, components, blockEditor} = wp;
const {registerBlockType} = blocks;
const {dispatch, select} = data;
const {Fragment} = element;
const {PanelBody, BaseControl, IconButton, Toolbar, Button} = components;
const {RichText, InspectorControls, AlignmentToolbar, PanelColorSettings, MediaUpload, BlockControls} = blockEditor;
const __ = Drupal.t;

const FEATURE_TEMPLATE = [
  ['core/heading', {
    placeholder: 'Title...',
    content: 'Feature title',
    level: 3,
  }],
  ['core/paragraph', {
    placeholder: 'Description...',
    content: "Description"
  }]
];

const FEATURE_CLASSES = "article gb-feature-block";

const settings = {
  title: __('Feature'),
  description: __('Feature tile'),
  icon: 'info',
  parent: ['custom/features-block'],
  attributes: {
    imageId: {
      type: 'number'
    },
    backgroundImage: {
      type: 'string',
      default: false
    },
    iconShape: {
      type: 'string',
      default: 'diamond'
    }
  },
  edit({className, attributes, setAttributes}) {
    const {imageId, backgroundImage, iconShape} = attributes;
    let iconClasses = backgroundImage ? 'icon' : 'icon icon--placeholder';
    iconClasses = iconShape != 'none' ? iconClasses + ` icon icon-shape icon-shape--${iconShape}` : iconClasses;
    return (
      <Fragment>
        <div className={className}>
          <BlockControls>
            <Toolbar>
              <MediaUpload
                allowedTypes={['image']}
                onSelect={media => setAttributes({imageId: media.id, backgroundImage: `url(${media.url})`})}
                value={imageId}
                render={({open}) => (
                  <IconButton
                    className="components-toolbar__select-image"
                    label={__('Select icon image')}
                    icon="star-filled"
                    onClick={open}/>
                )}
              />
            </Toolbar>
          </BlockControls>
          <article className={FEATURE_CLASSES}>
            <div className="column column--left">
              <div className="icon__wrapper">
                <span className={iconClasses} style={{backgroundImage}}></span>
              </div>
            </div>
            <div className="column column--right">
              <InnerBlocks template={FEATURE_TEMPLATE} templateLock={'all'}/>
            </div>
          </article>
        </div>
        <InspectorControls>
          <PanelBody title={__('Block settings')}>
            <SelectControl label={__('Icon shape')}
                           value={iconShape}
                           options={[
                             {
                               label: __('Diamond'),
                               value: 'diamond',
                             },
                             {
                               label: __('Square'),
                               value: 'square',
                             },
                             {
                               label: __('Circle'),
                               value: 'circle',
                             },
                             {
                               label: __('None'),
                               value: 'none',
                             }
                           ]}
                           onChange={value => setAttributes({iconShape: value})}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },
  save({className, attributes}) {
    const {backgroundImage, iconShape} = attributes;
    let iconClasses = backgroundImage ? 'icon' : 'icon icon--placeholder';
    iconClasses = iconShape != 'none' ? iconClasses + ` icon icon-shape icon-shape--${iconShape}` : iconClasses;
    return (
      <div className={className}>
        <artice className={FEATURE_CLASSES}>
          <div className="column column--left">
            <div className="icon__wrapper">
              <span className={iconClasses} style={{backgroundImage}}></span>
            </div>
          </div>
          <div className="column column--right">
            <InnerBlocks.Content/>
          </div>
        </artice>
      </div>
    );
  }
};

const category = {
  slug: 'features',
  title: __('Features'),
};

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);

registerBlockType(`${category.slug}/feature-block`, {category: category.slug, ...settings});
