<template>
  <section class="preview">
    <div class="preview__wrapper">
      <div class="preview__inner">
        <h1 class="preview__title">{{t('landing.preview.title')}}</h1>
        <div class="preview__buttons">
          <va-button class="preview__buttons--button"
            :to="`/${locale}/getting-started/installation`"
            :rounded="false"
            color="primary"
          >
            {{t('landing.preview.buttons.start')}}
          </va-button>
          <va-popover class="preview__buttons--button"
                      :message="t('landing.preview.buttons.askForStars')"
                      :modelValue="true"
                      :autoHide="false"
                      trigger="click"
          >
            <va-button href="https://github.com/epicmaxco/vuestic-ui"
                       target="_blank"
                       :rounded="false"
                       color="primary"
                       flat
            >
              <va-icon class="fa fa-github" style="margin-right: 0.5rem;" />
              {{t('landing.preview.buttons.github')}}
            </va-button>
          </va-popover>
        </div>

        <div class="preview__features">
          <!-- items -->
          <!-- <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/nuxt-support.svg" alt="nuxt-support">
            </div>
            <h2 class="item__title">{{t('landing.preview.features.nuxt.title')}}</h2>
            <router-link class="item__link" :to="`/${locale}/getting-started/nuxt-integration`">
              {{t('landing.preview.features.nuxt.text')}}
            </router-link>
          </div> -->

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/components.svg" alt="responsive-components">
            </div>
            <h2 class="item__title">{{t('landing.preview.features.components.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${locale}/ui-elements/avatar`">
              {{t('landing.preview.features.components.text')}}
            </router-link>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/keyboard-navigation.svg" alt="keyboard-navigation">
            </div>
            <h2 class="item__title">{{t('landing.preview.features.keyboard.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${locale}/getting-started/accessibility-guide`">
              {{t('landing.preview.features.keyboard.text')}}
            </router-link>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/modern-browsers.svg" alt="modern-browsers">
            </div>
            <h2 class="item__title">{{t('landing.preview.features.browsers.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${locale}/introduction/browser-support`">
              {{t('landing.preview.features.browsers.text')}}
            </router-link>
          </div>
          <!-- /items -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.preview {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: transparent;

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__title {
    @include col();
    @include size(12);
    @include title-font();

    padding-top: 3.5rem;
    text-align: center;
    font-weight: 900;
    font-size: 4.5rem;

    // sm
    @include sm(padding-top, 2rem);
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.5rem;

    // lg
    @include size-lg(10);
    @include shift-lg-left(1);
    // md
    @include size-md(6);
    @include shift-md-left(3);
    // xs
    @include size-xs(10);
    @include shift-xs-left(1);

    &--button {
      @include col();
      @include size(4);
      @include button-font();

      height: 3rem;

      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);
    }
  }

  &__image {
    position: absolute;
    background-size: contain;
    background-repeat: repeat-x;
    background-position: top;
    height: 342px;
    top: 20rem;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  &__features {
    @include row-flex();
    @include col();
    @include size(12);

    padding-top: 4rem;
    padding-bottom: 8rem;
    justify-content: center;

    @include sm(padding-bottom, 4rem);
  }
}

.item {
  @include col();
  @include size(3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  // lg
  @include size-lg(6);
  @include lg(padding-bottom, 3rem);
  // sm
  @include size-sm(12);

  &__frame {
    display: inline-block;
    padding: 0.75rem;
    border: 1px dashed $gray;
    border-radius: 1rem;
  }

  &__title {
    @include subtitle-font();

    text-align: center;
    padding: 0.75rem 0 0.5rem;
    line-height: 1.8rem;
  }

  &__link {
    @include link-font();

    text-align: center;
    line-height: 1.6rem;
    color: var(--va-primary);
  }
}

::v-deep(.va-dropdown__anchor) {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

::v-deep(.va-dropdown__anchor a) {
  width: 100%;
}

.components-slideshow {
  height: 342px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

</style>
