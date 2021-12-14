import { Page, Card, Tabs, Button, DataTable } from "@shopify/polaris";
import React, {useEffect, useState, useCallback} from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const Main = ({authAxios}) => {

  const [columnHeaders, setColumnHeaders] = useState('')
  const [columnData, setcolumnData] = useState('')
  const [selected, setSelected] = useState(0);

  useEffect(() => {

    authAxios.get('/customers')
    .then(result => {
      const shopper = result.data.body.customers.map(customer => {
        return {customer}})
      const length = result.data.body.customers.length

      for(let i = 0; i < length; i++) {
        console.log(Object.keys(shopper[i]))
        const columnHeaders = Object.keys(shopper[i])
        const columnData = (shopper[i])
        setColumnHeaders(columnHeaders)
        setcolumnData(columnData)
      } 

    }).catch(error => { console.log(error)})

  }, [authAxios])

  const headers = [{columnHeaders}];
  const data = [{columnData}];

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content:  'Customers',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Products',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Orders',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <>
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
    <Page
    title="Options"
    >
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            <CSVLink data={headers}>Download me</CSVLink>
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
    </>

  )
}

export default Main;