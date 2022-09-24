import './App.css';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

export type Customer = {
    id: number;
    name: string;
    industry: string;
};

const GET_DATA = gql`
    {
        customers {
            id
            name
            industry
        }
    }
`;

const MUTATE_DATA = gql`
    mutation MUTATE_DATA($name: String!, $industry: String!) {
        createCustomer(name: $name, industry: $industry) {
            customer {
                id
                name
            }
        }
    }
`;

function App() {
    const [name, setName] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const { loading, error, data } = useQuery(GET_DATA);
    const [
        createCustomer,
        {
            loading: createCustomerLoading,
            error: createCustomerError,
            data: createCustomerData,
        },
    ] = useMutation(MUTATE_DATA, {
        refetchQueries: [
            { query: GET_DATA }, // DocumentNode object parsed with gql
        ],
    });

    /*useEffect(() => {
        console.log(loading, error, data);
        console.log(
            createCustomer,
            createCustomerLoading,
            createCustomerError,
            createCustomerData
        );
    });*/
    return (
        <div className="App">
            {error ? <p>Something went wrong</p> : null}
            {loading ? <p>loading...</p> : null}
            {data
                ? data.customers.map((customer: Customer) => {
                      return (
                          <p key={customer.id}>
                              {customer.name + ' ' + customer.industry}
                          </p>
                      );
                  })
                : null}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createCustomer({
                        variables: { name: name, industry: industry },
                    });
                    if (!error) {
                        setName('');
                        setIndustry('');
                    }
                }}
            >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="industry">Industry:</label>
                    <input
                        id="industry"
                        type="text"
                        value={industry}
                        onChange={(e) => {
                            setIndustry(e.target.value);
                        }}
                    />
                </div>
                <button disabled={createCustomerLoading ? true : false}>
                    Add Customer
                </button>
                {createCustomerError ? <p>Error creating customer</p> : null}
            </form>
        </div>
    );
}

export default App;
