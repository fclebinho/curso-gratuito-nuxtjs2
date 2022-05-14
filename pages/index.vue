<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Transações
      </h1>

      <AppButton @click="isAdding = !isAdding">
        Nova transação
      </AppButton>
    </div>

    <TransactionAdd
      v-if="isAdding"
      @cancel="isAdding = false"
    />

    <TransactionFilter
      @filter="onFilter"
    />

    <div class="mt-4">
      <div class="space-y-8">
        <div
          v-for="(group, index) in transactionsGrouped"
          :key="index"
        >
          <div class="mb-1">
            <div class="font-bold text-sm">
              {{ formatDate(index) }}
            </div>
          </div>

          <div class="space-y-3">
            <Transaction
              v-for="transaction in group"
              :key="transaction.id"
              :transaction="transaction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy } from 'lodash';
import { mapState } from 'vuex';
import TransactionAdd from '~/components/Transactions/TransactionAdd';
import Transaction from '~/components/Transactions/Transaction';
import AppButton from '~/components/Ui/AppButton';
import TransactionFilter from '~/components/Transactions/TransactionFilter';

export default {
  name: 'IndexPage',

  components: {
    TransactionAdd,
    Transaction,
    AppButton,
    TransactionFilter,
  },

  data() {
    return {
      isAdding: false,
    }
  },

  mounted() {
    this.$store.dispatch('categories/FETCH_ALL');
    this.$store.dispatch('transactions/FETCH_ALL');
  },

  computed: {
    ...mapState({
      transactions: state => state.transactions.entries,
      categories: state => state.categories.entries,
    }),
    transactionsGrouped() {
      return groupBy(orderBy(this.transactions, 'date', 'desc'), 'date');
    },
  },

  methods: {
    formatDate(date) {
      return this.$dayjs(date).format('DD [de] MMM');
    },
    onFilter(filter) {
      this.$store.dispatch('transactions/FETCH_ALL', filter);
    },
  },
}
</script>
