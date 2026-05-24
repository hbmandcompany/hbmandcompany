import type { CommandAction, CommandResponse } from "@/components/desk/global-search/types";

type ParsedCommand = {
  action: CommandAction;
  message: string;
  redirectPath: string;
  entityId: string;
};

function parseCommand(query: string): ParsedCommand | null {
  const q = query.trim().toLowerCase();

  if (/\b(create|new)\s+(article|story|draft)\b/.test(q)) {
    return {
      action: "create_article",
      message: "Draft article created.",
      redirectPath: "/desk/newsroom/editor",
      entityId: `article_${Date.now()}`,
    };
  }

  if (/\bopen\s+(document|doc|file)\b/.test(q)) {
    return {
      action: "open_document",
      message: "Opening documents workspace.",
      redirectPath: "/desk/documents",
      entityId: "doc_latest",
    };
  }

  if (/\b(create|new)\s+case\b/.test(q)) {
    return {
      action: "create_case",
      message: "New case opened.",
      redirectPath: "/desk/board",
      entityId: `case_${Date.now()}`,
    };
  }

  if (/\bschedule\s+(a\s+)?meeting\b/.test(q)) {
    return {
      action: "schedule_meeting",
      message: "Meeting scheduler opened.",
      redirectPath: "/desk/meetings",
      entityId: `meeting_${Date.now()}`,
    };
  }

  if (/\bassign\b/.test(q)) {
    return {
      action: "assign",
      message: "Assignment flow ready.",
      redirectPath: "/desk/newsroom",
      entityId: `assign_${Date.now()}`,
    };
  }

  return null;
}

export function executeCommand(query: string): CommandResponse {
  const parsed = parseCommand(query);

  if (!parsed) {
    return {
      success: false,
      action: null,
      message: "No matching command. Try “create article”, “open document”, or “schedule meeting”.",
    };
  }

  return {
    success: true,
    action: parsed.action,
    message: parsed.message,
    redirectPath: parsed.redirectPath,
    entityId: parsed.entityId,
  };
}
