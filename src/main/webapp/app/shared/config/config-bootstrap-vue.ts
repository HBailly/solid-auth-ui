import {
  BAlert,
  BBadge,
  BButton,
  BButtonGroup,
  BCard,
  BCardBody,
  BCardHeader,
  BCardText,
  BCarousel,
  BCarouselSlide,
  BCollapse,
  BDropdown,
  BDropdownItem,
  BForm,
  BFormCheckbox,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BFormRadioGroup,
  BFormSelect,
  BFormSelectOption,
  BFormSelectOptionGroup,
  BFormTextarea,
  BImg,
  BInputGroup,
  BInputGroupPrepend,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
  BNavItemDropdown,
  BPagination,
  BProgress,
  BProgressBar,
  BSpinner,
  BTooltip,
  VBModal,
  VBToggle,
} from 'bootstrap-vue';

export function initBootstrapVue(vue) {
  vue.component('b-spinner', BSpinner);
  vue.component('b-badge', BBadge);
  vue.component('b-dropdown', BDropdown);
  vue.component('b-dropdown-item', BDropdownItem);
  vue.component('b-link', BLink);
  vue.component('b-alert', BAlert);
  vue.component('b-card', BCard);
  vue.component('b-card-header', BCardHeader);
  vue.component('b-card-text', BCardText);
  vue.component('b-card-body', BCardBody);
  vue.component('b-modal', BModal);
  vue.component('b-button', BButton);
  vue.component('b-button-group', BButtonGroup);
  vue.component('b-navbar', BNavbar);
  vue.component('b-navbar-nav', BNavbarNav);
  vue.component('b-navbar-brand', BNavbarBrand);
  vue.component('b-navbar-toggle', BNavbarToggle);
  vue.component('b-pagination', BPagination);
  vue.component('b-progress', BProgress);
  vue.component('b-progress-bar', BProgressBar);
  vue.component('b-list-group', BListGroup);
  vue.component('b-list-group-item', BListGroupItem);
  vue.component('b-form', BForm);
  vue.component('b-form-input', BFormInput);
  vue.component('b-form-select', BFormSelect);
  vue.component('b-form-select-option', BFormSelectOption);
  vue.component('b-form-select-option-group', BFormSelectOptionGroup);
  vue.component('b-form-group', BFormGroup);
  vue.component('b-form-radio', BFormRadio);
  vue.component('b-form-radio-group', BFormRadioGroup);
  vue.component('b-form-checkbox', BFormCheckbox);
  vue.component('b-form-textarea', BFormTextarea);
  vue.component('b-collapse', BCollapse);
  vue.component('b-img', BImg);
  vue.component('b-carousel', BCarousel);
  vue.component('b-carousel-slide', BCarouselSlide);
  vue.component('b-nav-item', BNavItem);
  vue.component('b-nav-item-dropdown', BNavItemDropdown);
  vue.component('b-modal', BModal);
  vue.directive('b-modal', VBModal);
  vue.directive('b-toggle', VBToggle);
  vue.component('b-tooltip', BTooltip);
  vue.component('b-form-datepicker', BFormDatepicker);
  vue.component('b-input-group', BInputGroup);
  vue.component('b-input-group-prepend', BInputGroupPrepend);
  vue.component('b-progress', BProgress);
}
