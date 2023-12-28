import { Box, Heading, Link as KumaLink, Spacer, Text } from "@kuma-ui/core";

import { MyAvatar } from "@/app/_components";
import { Link } from "@/app/_features/viewTransition";

export const Footer = () => {
  return (
    <footer>
      <Box as="section" textAlign={"center"}>
        <KumaLink as={Link} href="/">
          <MyAvatar />
          <Spacer size={"0.5rem"} />
          <Heading fontWeight={"bold"}>Hirotaka Miyagi</Heading>
          <Text variant="sm" color="colors.slate.400">
            Software Engineer / @mh4gf
          </Text>
        </KumaLink>
      </Box>
      <Spacer size={"1rem"} />
    </footer>
  );
};
