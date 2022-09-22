import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

export type Launch = {
    mission_name: string;
    launch_date_local: string;
    launch_site: {
        site_name_long: string;
    };
};

const GET_DATA = gql`
    {
        launchesPast(limit: 10) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(GET_DATA);

    useEffect(() => {
        console.log(loading, error, data);
    });
    return (
        <div className="App">
            {data
                ? data.launchesPast.map((launch: Launch) => {
                      return (
                          <p>
                              {launch.mission_name +
                                  ' ' +
                                  launch.launch_date_local}
                          </p>
                      );
                  })
                : null}
        </div>
    );
}

export default App;
