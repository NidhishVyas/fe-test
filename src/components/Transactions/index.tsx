import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithCache, loading } = useCustomFetch()

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
    },
    [fetchWithCache]
  )

  return (
    <div data-testid="transaction-container">
      {transactions === null ? (
        <div className="RampLoading--container">Loading...</div>
      ) : (
        transactions.map((transaction) => (
          <TransactionPane
            key={transaction.id}
            transaction={transaction}
            loading={loading}
            setTransactionApproval={setTransactionApproval}
          />
        ))
      )}
    </div>
  )
}
