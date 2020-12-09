<template>
  <div v-if="field.type === 'date'">
    <input type="date" :name="field.field" :value="value" />
  </div>
  <div
    v-else-if="field.type === 'string'"
    class="form-group"
    :class="{ 'form-group--error': $v.nameValidator.$error }"
  >
    <input
      type="text"
      :name="field.field"
      :placeholder="field.label"
      :class="status($v.nameValidator)"
      :value="nameValidator"
      @change="setNameValidator($event.target.value)"
    />
    <div class="error" v-if="!$v.nameValidator.required">Name is required</div>
    <div class="error" v-if="!$v.nameValidator.minLength">
      Name must have at least
      {{ $v.nameValidator.$params.minLength.min }} letters.
    </div>
  </div>
  <div v-else-if="field.type === 'email'">
    <input
      type="email"
      :name="field.field"
      :placeholder="field.label"
      :class="status($v.emailValidator)"
      :value="emailValidator"
      @change="setEmailValidator($event.target.value)"
    />
    <div class="error" v-if="!$v.emailValidator.required">
      Email is required
    </div>
  </div>
  <div v-else-if="field.type === 'select'">
    <select>
      <option
        v-for="(option, index) in field.meta.values"
        :key="`option-${index}`"
        >{{ option.label }}</option
      >
    </select>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      nameValidator: '',
      emailValidator: '',
    };
  },
  validations: {
    nameValidator: {
      required,
      minLength: minLength(4),
    },
    emailValidator: {
      required,
    },
  },
  methods: {
    setNameValidator(value) {
      this.nameValidator = value;
      this.$v.nameValidator.$touch();
    },
    setEmailValidator(value) {
      this.emailValidator = value;
      this.$v.emailValidator.$touch();
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  mounted() {
    if (this.field.validator === 'name') {
      this.nameValidator = this.value;
    } else if (this.field.validator === 'email') {
      this.emailValidator = this.value;
    }
  },
};
</script>
