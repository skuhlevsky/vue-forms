<template>
  <div id="app">
    <h1 class="app-name">
      Form Creator
    </h1>

    <form v-if="userFields">
      <FormElements
        v-for="(field, index) in userFields"
        :field="field"
        :value="userData[field.field]"
        :key="`field-${index}`"
      />
    </form>

    <button @click="shuffleObjectsInArray" v-html="'Shuffle!'" />
    <button v-html="'Submit'" @click="sendForm" />
  </div>
</template>

<script>
import FormElements from '@/components/FormElements';
export default {
  data: () => ({
    userFields: [
      { label: 'Name', field: 'name', type: 'string', validator: 'name' },
      { label: 'Email', field: 'email', type: 'email', validator: 'email' },
      {
        label: 'Gender',
        field: 'gender',
        type: 'select',
        meta: {
          values: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        },
      },
      { label: 'Subscribtion', field: 'sub', type: 'date' },
    ],
    userData: {
      name: 'Alexey',
      email: 'to@alex.com',
      gender: 'male',
      sub: '2020-12-08',
    },
  }),
  components: {
    FormElements,
  },
  methods: {
    // Перемешиваем поля формы
    shuffleObjectsInArray() {
      let array = this.userFields;
      let i = array.length;
      while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [array[i], array[ri]] = [array[ri], array[i]];
      }
      this.userFields = [...array];
    },
    sendForm() {
      console.log('форма отправлена');
    },
  },
};
</script>
