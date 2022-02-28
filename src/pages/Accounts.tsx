import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Box,
  chakra,
  Container,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { Column, useSortBy, useTable } from 'react-table'
import { AccountResponse } from '../api/generated'
import CustomAlertDialog from '../components/CustomAlertDialog'
import CustomButton from '../components/CustomButton'
import CreateAccountModal from '../components/form/CreateAccountModal'
import UpdateAccountModal from '../components/form/UpdateAccountModal'
import { useAppDispatch, useRequireAuth } from '../hooks/hooks'
import { DeleteAccountAsync, useAccounts } from '../redux/accountsSlice'

const Accounts = () => {
  const [deleteIsOpen, setDeleteIsOpen] = React.useState(false)
  const [createIsOpen, setCreateIsOpen] = React.useState(false)
  const [updateIsOpen, setUpdateIsOpen] = React.useState(false)
  const [accountToDelete, setAccountToDelete] =
    React.useState<AccountResponse | null>(null)
  const [accountIdToUpdate, setAccountIdToUpdate] = React.useState<number | null>(
    null
  )

  useRequireAuth()
  const dispatch = useAppDispatch()
  const { accounts } = useAccounts()

  const deleteClickHandler = (obj: AccountResponse) => {
    setDeleteIsOpen(true)
    setAccountToDelete(obj)
  }

  const updateClickHandler = (obj: AccountResponse) => {
    setUpdateIsOpen(true)
    setAccountIdToUpdate(obj.id)
  }

  const deleteSubmitHandler = () => {
    dispatch(DeleteAccountAsync(accountToDelete!.id))
    setDeleteIsOpen(false)
    setAccountToDelete(null)
  }

  const data = React.useMemo(() => accounts, [accounts])

  const columns = React.useMemo<
    Column<AccountResponse>[] & { isNumeric?: boolean }
  >(
    () => [
      {
        Header: 'Id',
        accessor: (x) => x.id,
        isnumeric: true,
      },
      {
        Header: 'Fullname',
        accessor: (x) => x.fullName,
      },
      {
        Header: 'Email',
        accessor: (x) => x.email,
      },
      {
        Header: 'Created',
        accessor: (x) => x.createdDate,
        Cell: ({ value }: { value: string }) =>
          new Date(value).toLocaleString(),
      },
      {
        Header: 'Actions',
        accessor: (x) => x,
        disableSortBy: true,
        Cell: ({ value }: { value: AccountResponse }) => (
          <>
            <CustomButton
              title="Edit"
              color="green"
              onClickHandler={() => updateClickHandler(value)}
            />
            <CustomButton
              title="Delete"
              color="red"
              onClickHandler={() => deleteClickHandler(value)}
            />
          </>
        ),
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <Container paddingTop="150px" maxW={'150ch'}>
      <Stack spacing={10}>
        <Heading as="h1" size="xl">
          Accounts
        </Heading>
        <Box>
          <CustomButton
            title="Create account"
            onClickHandler={() => setCreateIsOpen(true)}
            color="green"
          />
        </Box>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      // isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Stack>
      <CreateAccountModal
        title="Create an account"
        content={`Create a new account. This will create a new user in the system and send an invitation email to the provided email-address.`}
        isOpen={createIsOpen}
        onClose={() => setCreateIsOpen(false)}
      />
      <UpdateAccountModal
        title="Update an account"
        content={`Update an existing account. This will update the user in the system.`}
        isOpen={updateIsOpen}
        accountId={accountIdToUpdate}
        onClose={() => setUpdateIsOpen(false)}
      />
      <CustomAlertDialog
        title="Are you sure that you want to delete"
        content={`The account ${accountToDelete?.fullName} will be deleted. This action cannot be undone.`}
        isOpen={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        onSubmit={deleteSubmitHandler}
      />
    </Container>
  )
}

export default Accounts
