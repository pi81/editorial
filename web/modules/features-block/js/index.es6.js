const {blocks, data, element, components, blockEditor} = wp;
const {registerBlockType} = blocks;
const {dispatch, select} = data;
const {Fragment} = element;
const {PanelBody, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl, Button, Disabled} = components;
const {InnerBlocks, RichText, InspectorControls, AlignmentToolbar, PanelColorSettings, MediaUpload, BlockControls} = blockEditor;
const __ = Drupal.t;

const FEATURE_BLOCK = ['features/feature-block'];
const FEATURES_CLASSES = "section gb-features-block";
const MIN_FEATURE_WIDTH = 350;

const settings = {
  title: __('Features'),
  description: __('Features'),
  icon: 'info',
  attributes: {
    align: {
      type: 'string',
      default: 'full'
    },
    maxWidth: {
      type: 'number',
      default: 1400
    },
    columnWidth: {
      type: 'number',
      default: 450
    }
  },

  edit({className, attributes, setAttributes, isSelected}) {
    const {maxWidth, columnWidth} = attributes;
    const gridTemplateColumns = `repeat(auto-fit, minmax(${columnWidth > MIN_FEATURE_WIDTH ? columnWidth : MIN_FEATURE_WIDTH}px, 1fr))`;
    return (
      <Fragment>
        <div className={className}>
          <section className={FEATURES_CLASSES} style={{maxWidth, gridTemplateColumns}}>
            <InnerBlocks template={[FEATURE_BLOCK]} templateLock={false} allowedBlocks={FEATURE_BLOCK}/>
          </section>
        </div>
        <InspectorControls>
          <PanelBody title={__('Block settings')}>
            <BaseControl label={__('Section Width in pixels')}>
              <input
                id="gb-features-block-input-section-width"
                type="number"
                value={maxWidth}
                onChange={e => setAttributes({maxWidth: parseInt(e.target.value, 10)})}
                step="5"
              />
            </BaseControl>
          <RangeControl
            label={__('Featue with in pixels')}
            value={columnWidth}
            onChange={value => setAttributes({columnWidth: value})}
            min={250} max={1200} step={50}
          />
          </PanelBody>
        </InspectorControls>
      </Fragment>
  );
  },
  save({className, attributes}) {
    const {maxWidth, columnWidth} = attributes;
    const gridTemplateColumns = `repeat(auto-fit, minmax(${columnWidth > MIN_FEATURE_WIDTH ? columnWidth : MIN_FEATURE_WIDTH}px, 1fr))`;
    return (
    <div className={className}>
    <section className={FEATURES_CLASSES} style={{maxWidth, gridTemplateColumns}}>
    <InnerBlocks.Content/>
    </section>
    </div>
    );
  },
  getEditWrapperProps (attributes) {
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

  registerBlockType(`${category.slug}/features-block`, {category: category.slug, ...settings});
