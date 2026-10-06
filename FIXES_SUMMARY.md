# AI Configuration

The application uses Google AI Studio and Gemini for AI chat.

## Configuration

- Set `GOOGLE_API_KEY` in the ignored local `.env` file using a key created for the intended AI Studio project.
- Set `GOOGLE_AI_MODEL` to `gemini-3.1-flash-lite`.
- Keep API keys out of source files, browser code, and version control.
- Run `npx prisma migrate deploy` after pulling database migrations.
- Restart the Next.js server after changing `.env`.

The chat API uses the saved Gemini model and the Google API key from the server environment. The old NVIDIA-only route backup has been removed.
