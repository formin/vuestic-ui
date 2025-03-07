<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__inner">
        <div class="footer__buttons">
          <va-button
            class="footer__buttons__button"
            href="https://epicmax.co/about"
            target="blank"
            :rounded="false"
            color="primary"
            flat
          >
            <va-icon class="button-icon" :component="IconEpicmax" />
            {{ $t("landing.footer.buttons.epicmax") }}
          </va-button>
          <va-button
            class="footer__buttons__button"
            href="https://github.com/epicmaxco/vuestic-admin"
            target="blank"
            :rounded="false"
            color="primary"
            flat
          >
            <va-icon class="button-icon" :component="IconAdmin" />
            {{ $t("landing.footer.buttons.admin") }}
          </va-button>
          <va-button
            class="footer__buttons__button"
            href="https://github.com/epicmaxco/epic-spinners"
            target="blank"
            :rounded="false"
            color="primary"
            flat
          >
            <va-icon class="button-icon" :component="IconSpinners" />
            {{ $t("landing.footer.buttons.spinners") }}
          </va-button>
        </div>
        <div class="footer__social">
          <va-button
            class="footer__social__item"
            href="https://github.com/epicmaxco/vuestic-ui/"
            target="blank"
            color="primary"
            flat
          >
            <va-icon class="mdi mdi-github" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://discord.gg/u7fQdqQt8c"
            target="blank"
            color="primary"
            flat
          >
            <va-icon class="mdi mdi-discord" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://www.facebook.com/epicmaxco/"
            target="blank"
            color="primary"
            flat
          >
            <va-icon class="mdi mdi-facebook" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://twitter.com/epicmaxco"
            target="blank"
            color="primary"
            flat
          >
            <va-icon class="mdi mdi-twitter" />
          </va-button>
        </div>
        <div class="footer__subtitle">
          {{ $t("landing.footer.text") }}
          <a :style="{ color: primaryColor }" href="mailto:hello@epicmax.co">
            hello@epicmax.co
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import IconEpicmax from './icons/IconEpicmax.vue'
import IconAdmin from './icons/IconAdmin.vue'
import IconSpinners from './icons/IconSpinners.vue'
import { getColor } from 'vuestic-ui/src/main'
import { markRaw } from 'vue'

@Options({
  name: 'LandingFooter',
})
export default class Footer extends Vue {
  IconEpicmax = markRaw(IconEpicmax);
  IconAdmin = markRaw(IconAdmin);
  IconSpinners = markRaw(IconSpinners);

  get primaryColor () {
    return getColor('primary')
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/main";

.footer {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: transparent;

  // sm
  @include sm(padding-top, 1rem);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__image {
    @include col();
    @include size(12);

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 3.5rem;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    line-height: 1.5;
    padding: 3rem 0 4rem;
    text-align: center;

    // sm
    @include sm(padding-top, 2rem);
    @include sm(padding-bottom, 3rem);
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    display: flex;
    justify-content: center;
    align-items: center;

    // lg
    @include size-lg(10);
    @include shift-lg-left(1);
    // md
    @include size-md(4);
    @include shift-md-left(4);
    // sm
    @include size-md(6);
    @include shift-md-left(3);
    // xs
    @include size-xs(12);
    @include shift-xs-left(0);

    &__button {
      @include col();
      @include size(4);
      @include button-font();

      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);

      .button-icon {
        margin-right: 0.5rem;
      }
    }
  }

  &__social {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    // sm
    @include sm(padding-top, 1.5rem);

    &__item {
      font-weight: 600;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
