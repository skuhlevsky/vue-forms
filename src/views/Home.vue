<template>
  <div v-if="allNotes.length">
    <input
      class="field__search"
      autofocus
      autocomplete="off"
      placeholder="Search..."
      v-model="search"
    />
    <div class="note-area">
      <div class="note-title">{{ allNotes[0].title }}</div>
      <div class="wrapper"></div>
    </div>
  </div>
</template>

<script>
import FormElements from '@/components/FormElements';
export default {
  data: () => ({
    search: '',
    minSearchStringSize: 0, // off
  }),
  components: {
    Elements,
  },
  filters: {
    resultView(name, searchStr) {
      if (!name) return `${searchStr}`;
      return `${name}`;
    },
  },
  computed: {
    ...mapGetters(['allNotes', 'notesCount']),
    filteredListNames() {
      if (this.search.length < this.minSearchStringSize) return null;

      let searchResult = this.allNotes[0].elements.filter((user) => {
        return user.name.toLowerCase().includes(this.search);
      });

      if (searchResult.length > 0) {
        // At least one character is needed for sorting
        const count = (str) => {
          return (str.match(new RegExp(this.search, 'g')) || []).length;
        };
        searchResult.sort((a, b) => count(b.name) - count(a.name));
      }

      return searchResult;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    ...mapActions(['fetchNotes']),
  },
  mounted() {
    // Getting elements if they are not in the LocalStorage
    if (!this.notesCount) {
      this.fetchNotes('All elements');
    }
  },
};
</script>
