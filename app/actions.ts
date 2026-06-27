"use server";

export async function logToTerminal(message: string, data?: any) {
  if (data) {
    console.log(`[CLIENT LOG]: ${message}`, data);
  } else {
    console.log(`[CLIENT LOG]: ${message}`);
  }
}
