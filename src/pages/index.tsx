import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { CardContents } from "../components/CardContents";
import { Layout } from "../components/Layout";
import { useCardsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, loading, fetchMore, variables } = useCardsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <SimpleGrid columns={3} spacing={10}>
          {data!.cards.cards.map((c) =>
            !c ? null : (
              <CardContents
                key={c.id}
                image={c.image}
                name={c.name}
                value={c.value as any}
                specialization={c.specialization}
                description={c.description}
                cardId={c.id}
                users={c.users}
              />
            )
          )}
        </SimpleGrid>
      )}
      {data && data.cards.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  limit: variables!.limit,
                  cursor:
                    data.cards.cards[data.cards.cards.length - 1].createdAt,
                },
              })
            }
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
