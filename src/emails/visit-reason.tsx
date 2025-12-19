import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type VisitReasonProps = {
  reason: string;
  contact?: string;
};

export default function VisitReasonEmail({
  reason,
  contact,
}: VisitReasonProps) {
  return (
    <Html>
      <Head />
      <Preview>New note from bedvista.com</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>bedvista.com</Text>
          <Section style={section}>
            <Text style={heading}>Someone left a note</Text>
            <Text style={label}>What they wrote</Text>
            <Text style={message}>{reason}</Text>
            <Hr style={hr} />
            <Text style={label}>How to reach them</Text>
            <Text style={value}>
              {contact?.trim() || "No contact info shared"}
            </Text>
          </Section>
          <Text style={footer}>Sent automatically via Resend + React Email</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#0b0b0b",
  color: "#f8f8f8",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  padding: "24px",
};

const container: React.CSSProperties = {
  backgroundColor: "#0f0f0f",
  border: "1px solid #1f1f1f",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "640px",
  padding: "24px",
};

const section: React.CSSProperties = {
  lineHeight: 1.5,
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  margin: "4px 0 16px",
};

const eyebrow: React.CSSProperties = {
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "11px",
  color: "#a1a1aa",
  margin: "0 0 4px",
};

const label: React.CSSProperties = {
  fontSize: "13px",
  color: "#a1a1aa",
  margin: "0 0 6px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const message: React.CSSProperties = {
  backgroundColor: "#141414",
  border: "1px solid #1f1f1f",
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "15px",
  color: "#f5f5f5",
  margin: "0 0 12px",
  whiteSpace: "pre-wrap",
};

const value: React.CSSProperties = {
  fontSize: "14px",
  color: "#f5f5f5",
};

const hr: React.CSSProperties = {
  borderColor: "#1f1f1f",
  margin: "16px 0",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  marginTop: "16px",
};
