import { Box, HStack, Text } from "@kuma-ui/core";

import { ColorModeToggle } from "./colorMode";
import { Link } from "./viewTransition";

const navigation = [{ name: "Articles", href: "/articles" }] as const;

export const Header = () => {
  return (
    <header>
      <HStack
        as={"nav"}
        alignItems="center"
        justify={"space-between"}
        py={"1.5rem"}
        mx={"auto"}
        aria-label="Global"
      >
        <HStack alignItems={"center"} justify={"space-between"} gap="3rem" width={"100%"}>
          <Box as={Link} href="/" p={"0.375rem"} m={"-0.375rem"}>
            mh4gf.dev
          </Box>
          <HStack alignItems={"center"} gap={["1.5rem", "3rem"]}>
            {navigation.map((item) => (
              <Text variant="sm" as={Link} key={item.name} href={item.href}>
                {item.name}
              </Text>
            ))}
            <ColorModeToggle />
          </HStack>
        </HStack>
      </HStack>
    </header>
  );
};
