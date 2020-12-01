import React from 'react';
import { Card } from 'react-bootstrap';

export default ({ users }) => {
  console.log(users);
  return (
    <>
      <div>
        {users ? (
          <>
            {users?.map((data, i) => {
              return (
                <Card key={i} className="mb-1">
                  <Card.Body>{data.name}</Card.Body>
                </Card>
              );
            })}
          </>
        ) : null}
      </div>
    </>
  );
};
