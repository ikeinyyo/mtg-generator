# MTGenerator

## Features

### Generate MTG card using AI

You can generate MTG cards using AI writing a prompt and clicking on Create button. It will use Azure OpenAI to generate the card text and the card image.

![Feature AI](/docs/images/feature_ai.jpg)

### Generate or edit MTG Card using the form

Also, you can create or edit your cards using the form.

![Feature Form](/docs/images/feature_form.jpg)

### Action buttons

You have 4 buttons to do different actions.

- Download: download the card to your device.
- Save: store the image in the gallery.
- Paint again: re-generate the MTG illustration.
- Re-generate: generate the entire MTG card again.

![Feature Buttons](/docs/images/feature_buttons.jpg)

### Gallery with the stored cards

Show the stored cards in the gallery.

![Feature Gallery](/docs/images/feature_gallery.jpg)

## Getting Started

### Environment variables

To use MTGenerator, first you must create a `.env` file copying `.env.template`.

```
// Azure OpenAI
AZURE_OPENAPI_ENDPOINT=
AZURE_OPENAPI_KEY=
AZURE_OPENAPI_GPT_DEPLOYMENT=
AZURE_OPENAPI_DALLE_DEPLOYMENT=

// Storage Account (to store the cards)
STORAGE_ACCOUNT_CONNECTION_STRING=
STORAGE_ACCOUNT_CONTAINER_NAME=
```

**Note:** if you don't have this information you cannot use the AI to generate images or store the images. However, you can use the Form to create your card and Download it.

### Run solution

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

### Epic: MVP

- [x] Save Card to Storage
- [x] Show all cards in the Storage
- [x] Regenerate image
- [x] Show error toast
- [ ] Image options: download, delete
- [ ] Virtualize list
- [ ] Users by Google (NextAuth)
- [ ] IaC
- [ ] CI/CD
- [ ] Backup images: upload images to blob after generation
- [ ] Add expansion icon
- [ ] Tooltip to explain form (mana cost and text)

### Epic: Edit cards

- [x] Edit data form
- [ ] Store metadata instead of the rendered image

## Author

### Sergio Gallardo Sales

Follow me on [Twitter](https://x.com/ikeinyyo), [Github](https://github.com/ikeinyyo), and [LinkedIn](https://www.linkedin.com/in/sergiogallardosales/).

## Reference

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
