export const pointPolicy = {
  en: ['Finish study: 10 EXP', 'Win practice: 20 EXP', 'Each reward counts once'],
  mm: ['သင်ခန်းစာဖတ်ပြီးလျှင် 10 EXP', 'လေ့ကျင့်ခန်းအောင်လျှင် 20 EXP', 'ဆုတစ်ခုကို တစ်ကြိမ်သာရမည်'],
}

export const gameTypes = [
  { id: 'signal-sort', label: { en: 'Signal Sort', mm: 'သတိပေးချက်ရှာရန်' }, icon: 'SS' },
  { id: 'timeline-fix', label: { en: 'Timeline Fix', mm: 'အစီအစဉ်မှန်စီရန်' }, icon: 'TF' },
  { id: 'choice-check', label: { en: 'Choice Check', mm: 'အဖြေမှန်ရွေးရန်' }, icon: 'CC' },
]

const chapterPlans = [
  {
    id: 'chapter-1',
    number: 1,
    title: { en: 'Pause Before Sharing', mm: 'မမျှဝေခင် ခဏရပ်ပါ' },
    subtitle: { en: 'Build calm habits for viral posts and urgent claims.', mm: 'လူများနေရာအနှံ့မျှဝေနေသော သတင်းများကို မမျှဝေခင် ခဏရပ်ပြီးစစ်တတ်အောင် လေ့ကျင့်ပါ။' },
    accent: '#0a5a4b',
    connectedModule: { label: 'အမှန်စစ်', path: '/truth-check' },
    topics: [
      ['Check the sender', 'Compare the name, account age, and contact details before trusting a message.', 'Sender · Account · Contact', 'A new account uses a school logo and asks students to join a prize group.'],
      ['Slow urgent posts', 'Urgent wording is a signal to pause, not a reason to share faster.', 'Pause · Breathe · Check', 'A post says a road will close in one hour and asks everyone to forward immediately.'],
      ['Read past the headline', 'A headline can exaggerate a careful story. Open the full post before reacting.', 'Headline · Body · Match', 'A headline says a food is banned, but the article only says one shop failed inspection.'],
      ['Spot missing evidence', 'Strong claims need clear evidence, not only confident words.', 'Claim · Proof · Link', 'A message says experts confirmed a danger but gives no report, name, or link.'],
      ['Check dates', 'Old news can look new when people remove the date.', 'Date · Event · Today', 'An old storm warning is reposted during a rainy week with the date cropped out.'],
      ['Trace the first source', 'Look for where the claim started before trusting copies.', 'Original · Copy · Source', 'Ten pages share the same text, but none link to where the information began.'],
      ['Watch emotional hooks', 'Fear and anger can push people to skip checking.', 'Feeling · Pressure · Pause', 'A post uses shocking words and asks readers to punish someone before facts are clear.'],
      ['Notice miracle cures', 'Health shortcuts need extra care and trusted medical sources.', 'Health · Expert · Evidence', 'A video claims one drink cures several diseases overnight.'],
      ['Separate fact and opinion', 'Opinions can be useful, but they are not proof by themselves.', 'Fact · Opinion · Proof', 'A creator says a new rule is terrible, but never shows what the rule says.'],
      ['Check quoted names', 'A famous name in a post does not prove the person said it.', 'Quote · Person · Record', 'A quote is placed beside a famous person photo with no interview or speech link.'],
      ['Verify screenshots', 'Screenshots can be edited, cropped, or missing context.', 'Screenshot · Context · Link', 'A screenshot of a bank message spreads, but the sender and date are hidden.'],
      ['Check numbers', 'Big numbers need a source, date, and method.', 'Number · Source · Method', 'A post says thousands are affected but does not say who counted or when.'],
      ['Look for copy-paste rumors', 'Repeated text across many pages can be a rumor pattern.', 'Pattern · Source · Repeat', 'The exact same warning appears in many groups with no local details.'],
      ['Avoid shame-sharing', 'Do not repost harmful claims just to mock them.', 'Harm · Audience · Care', 'Someone reposts a false claim to laugh at it, but more people see the claim.'],
      ['Use a trusted adult', 'When a claim feels serious, ask a trusted person before acting.', 'Ask · Verify · Decide', 'A message asks for personal data for school registration, but the link looks unusual.'],
      ['Save useful evidence', 'Keep links, dates, and screenshots when something may need reporting.', 'Save · Time · Link', 'A scam account deletes messages after asking for payment.'],
      ['Check platform labels', 'Warnings and context labels can help you decide what to inspect next.', 'Label · Context · Next', 'A platform adds a context note under a viral claim.'],
      ['Compare two sources', 'One source can be wrong. Two independent sources are stronger.', 'Source A · Source B · Match', 'Only one page reports an important announcement; no other trusted source confirms it.'],
      ['Pause before forwarding', 'Forwarding is publishing to your circle. Treat it with care.', 'Forward · Responsibility · Care', 'A family member asks you to forward a warning to every group.'],
      ['Make the safe call', 'When unsure, do not share yet. Checking later is stronger than guessing now.', 'Unsure · Wait · Check', 'You cannot confirm a claim before class starts, but friends are asking for an answer.'],
    ],
  },
  {
    id: 'chapter-2',
    number: 2,
    title: { en: 'Media Evidence Lab', mm: 'မီဒီယာအထောက်အထားစစ်ခန်း' },
    subtitle: { en: 'Inspect images, video, captions, and AI clues.', mm: 'ဓာတ်ပုံ၊ ဗီဒီယို၊ စာတန်းနှင့် AI ပုံရိပ်လက္ခဏာများကို စစ်ဆေးပါ။' },
    accent: '#16896f',
    connectedModule: { label: 'စုံထောက်သင်ခန်းစာများ', path: '/academy' },
    topics: [
      ['Match image and caption', 'A real image can mislead when the caption changes the story.', 'Image · Caption · Match', 'A photo from a market is captioned as a protest scene.'],
      ['Search older copies', 'Older copies can reveal a reused image or a different event.', 'Older · Copy · Event', 'A flood image is shared as today, but older copies may show another year.'],
      ['Check location clues', 'Signs, buildings, roads, and weather can help test the place.', 'Sign · Place · Weather', 'A caption names Yangon, but a shop sign in the image points to another city.'],
      ['Inspect video cuts', 'Short clips may hide what happened before or after.', 'Before · After · Clip', 'A 7-second clip shows an argument but not what started it.'],
      ['Notice audio mismatch', 'Audio can be added later or taken from another event.', 'Audio · Source · Match', 'Crowd audio is placed over a quiet street video.'],
      ['Read image details', 'Small details often carry the strongest clues.', 'Zoom · Detail · Clue', 'A bus number, road sign, or shop name can help confirm a place.'],
      ['Check AI smoothness', 'AI images can have strange hands, text, reflections, or shadows.', 'Hands · Text · Shadow', 'A dramatic rescue image looks polished but has unreadable signs and odd fingers.'],
      ['Look at lighting', 'Lighting and shadows should agree with the scene.', 'Light · Shadow · Direction', 'People in one image have shadows going in different directions.'],
      ['Compare weather reports', 'Weather can test whether a claimed time and place make sense.', 'Weather · Time · Place', 'A photo claims heavy rain today, but local weather records show dry conditions.'],
      ['Verify uniforms and logos', 'Uniforms and logos can identify a real group or reveal a mismatch.', 'Logo · Uniform · Context', 'A fake notice uses an outdated logo or wrong uniform color.'],
      ['Check map distance', 'A place claim should fit the geography around it.', 'Map · Distance · Place', 'A video claims two places are beside each other, but a map shows they are far apart.'],
      ['Avoid cropped conclusions', 'A crop can hide important context outside the frame.', 'Crop · Frame · Context', 'A cropped image hides a sign explaining that the scene is a training drill.'],
      ['Read comments carefully', 'Comments may include corrections, but they also need checking.', 'Comment · Claim · Check', 'A commenter says the image is old, but gives no source.'],
      ['Check official updates', 'Emergencies need official or trusted local updates before sharing.', 'Official · Local · Update', 'A disaster rumor spreads before rescue teams or local pages post updates.'],
      ['Separate satire', 'Jokes and satire can spread as if they are real news.', 'Satire · Tone · Source', 'A comedy page posts an impossible announcement and people share it as real.'],
      ['Test before/after claims', 'Before/after images need dates, locations, and unchanged framing.', 'Before · After · Proof', 'A before/after pair uses different angles to exaggerate damage.'],
      ['Watch generated faces', 'AI faces can look convincing while small features break consistency.', 'Face · Feature · Consistency', 'A profile picture has mismatched earrings, hair edges, and background blur.'],
      ['Keep privacy in mind', 'Do not expose private people while checking media.', 'Privacy · Safety · Care', 'A student face appears in a rumor screenshot.'],
      ['Build a media checklist', 'Use the same steps each time so pressure does not choose for you.', 'Checklist · Repeat · Calm', 'A breaking-news image arrives while everyone is worried.'],
      ['Choose a confidence level', 'Say how sure you are instead of pretending every answer is certain.', 'Confidence · Evidence · Humility', 'You find one clue, but not enough to fully prove the image is false.'],
    ],
  },
  {
    id: 'chapter-3',
    number: 3,
    title: { en: 'Respond With Care', mm: 'ဂရုစိုက်ပြီး တုံ့ပြန်ပါ' },
    subtitle: { en: 'Correct rumors without shaming people.', mm: 'လူကိုအရှက်မပေးဘဲ ကောလာဟလကို အချက်အလက်ဖြင့်ရှင်းပြပါ။' },
    accent: '#f0a326',
    connectedModule: { label: 'အမှန်စစ်', path: '/truth-check' },
    topics: [
      ['Start kindly', 'People listen better when correction begins with respect.', 'Kind · Calm · Respect', 'A relative shares a false warning because they are worried about family safety.'],
      ['Correct the claim', 'Focus on the information, not attacking the person.', 'Claim · Person · Care', 'A friend repeats a rumor, but they did not create it.'],
      ['Use one clear source', 'A short correction with one strong source is easier to accept.', 'One · Clear · Source', 'A group chat has many links, but only one trusted source is needed.'],
      ['Avoid public shaming', 'Private correction can protect dignity and reduce arguments.', 'Private · Dignity · Trust', 'A classmate shares wrong information in a public post.'],
      ['Ask a gentle question', 'A question can invite checking without starting a fight.', 'Question · Invite · Check', 'Someone is sure a rumor is true but has not checked the source.'],
      ['Share uncertainty honestly', 'It is okay to say what you know and what still needs checking.', 'Known · Unknown · Honest', 'You can confirm the photo is old, but not the full original story yet.'],
      ['Calm group chats', 'A calm message can slow a rumor before it spreads further.', 'Group · Pause · Calm', 'A family chat starts forwarding the same warning again and again.'],
      ['Protect vulnerable people', 'Rumors can harm real people, especially during fear or crisis.', 'Harm · People · Protect', 'A rumor names a private person and asks people to expose them.'],
      ['Do not amplify hate', 'Avoid repeating hateful claims more than necessary.', 'Hate · Limit · Report', 'A post targets a group with insulting language and false claims.'],
      ['Choose the right channel', 'Some issues need a private message, report tool, or trusted adult.', 'Channel · Safety · Help', 'A scammer asks younger students for codes in a group chat.'],
      ['Thank the sharer', 'Appreciating concern can make correction easier to hear.', 'Thanks · Concern · Correction', 'A neighbor shares a warning because they want people to be safe.'],
      ['Use plain language', 'Simple words travel better than a long lecture.', 'Plain · Short · Clear', 'A long fact-check article needs to become a short chat reply.'],
      ['Invite a pause', 'Ask people to wait while the group checks the source.', 'Wait · Check · Share', 'A message says everyone must act before midnight.'],
      ['Repair after sharing', 'If you shared something wrong, correct it clearly.', 'Own · Correct · Repair', 'You forwarded a rumor, then later find a trusted correction.'],
      ['Report harmful scams', 'When content asks for money or codes, reporting can protect others.', 'Money · Codes · Report', 'An account pretends to be support and asks for OTP codes.'],
      ['Handle family rumors', 'Respect family relationships while checking the claim.', 'Family · Respect · Fact', 'An elder shares an old medical rumor in the family group.'],
      ['Keep screenshots safe', 'Evidence helps, but private details should be covered.', 'Evidence · Privacy · Safe', 'You need to report a harmful post without exposing a child phone number.'],
      ['De-escalate arguments', 'When comments get heated, slow the tone and return to evidence.', 'Tone · Evidence · Calm', 'Two friends argue over a viral claim and stop listening to each other.'],
      ['Encourage shared checking', 'Make checking feel like teamwork, not punishment.', 'Team · Learn · Trust', 'A group wants to know what is true but nobody wants to be blamed.'],
      ['Close the loop', 'After checking, share the result and what source you used.', 'Result · Source · Next', 'People paused for your check, so they need a clear final update.'],
    ],
  },
]

function makeLesson(chapter, lessonNumber, title, body, habit, caseStudy) {
  const gameType = gameTypes[(chapter.number + lessonNumber - 2) % gameTypes.length].id
  const id = `${chapter.id}-lesson-${lessonNumber}`
  const study = buildStudy(chapter, lessonNumber, title, body, habit, caseStudy)

  return {
    id,
    number: lessonNumber,
    gameType,
    title: { en: title, mm: toMyanmarTitle(title) },
    body: { en: body, mm: toMyanmarWhy(chapter.number, title) },
    habit: { en: habit, mm: habit },
    study,
    points: 10,
    game: buildGame(gameType, chapter, lessonNumber, title, habit, caseStudy, study),
  }
}

function buildStudy(chapter, lessonNumber, title, body, habit, caseStudy) {
  const chapterFocus = {
    1: 'sharing decision',
    2: 'media evidence',
    3: 'careful response',
  }[chapter.number]
  const enSkill = habit.split(' · ')
  const mmSkill = enSkill.map((item) => toMyanmarHabit(item))

  return {
    objective: {
      en: `Learn how to use ${habit.toLowerCase()} before making a ${chapterFocus}.`,
      mm: `ဤသင်ခန်းစာတွင် "${toMyanmarTitle(title)}" အတွက် သတိထားရမည့်အချက်များကို လေ့လာပြီး မမျှဝေခင် စစ်ဆေးတတ်အောင်လေ့ကျင့်မည်။`,
    },
    caseStudy: {
      en: caseStudy,
      mm: toMyanmarCase(chapter.number, title),
    },
    why: {
      en: body,
      mm: toMyanmarWhy(chapter.number, title),
    },
    steps: enSkill.map((item, index) => ({
      en: stepText(chapter.number, item, index),
      mm: stepTextMm(chapter.number, mmSkill[index], index),
    })),
    exampleAnswer: {
      en: exampleAnswer(chapter.number, title, habit),
      mm: exampleAnswerMm(chapter.number, title, habit),
    },
    commonMistake: {
      en: commonMistake(chapter.number, title),
      mm: commonMistakeMm(chapter.number, title),
    },
    detectiveNote: {
      en: `Detective habit: write one sentence that says what you checked and what is still unknown.`,
      mm: `စုံထောက်အကျင့်: စစ်ပြီးသားအချက်နှင့် မသေချာသေးသောအချက်ကို စာကြောင်းတစ်ကြောင်းဖြင့် ရေးမှတ်ပါ။`,
    },
  }
}

function stepText(chapterNumber, item, index) {
  const chapterSteps = {
    1: [
      `Find the ${item.toLowerCase()} in the post, not in the comment guessing below it.`,
      `Ask whether the ${item.toLowerCase()} is named, dated, and connected to evidence.`,
      `Decide whether the ${item.toLowerCase()} is strong enough to share or needs more checking.`,
    ],
    2: [
      `Look for the ${item.toLowerCase()} inside the image, video, caption, or original upload.`,
      `Compare that ${item.toLowerCase()} with another clue instead of trusting it alone.`,
      `Mark whether the ${item.toLowerCase()} supports the caption, weakens it, or stays unclear.`,
    ],
    3: [
      `Use ${item.toLowerCase()} to protect the person while correcting the claim.`,
      `Keep the ${item.toLowerCase()} short enough for a chat reply.`,
      `Check that the ${item.toLowerCase()} lowers tension and points back to evidence.`,
    ],
  }

  return chapterSteps[chapterNumber][index] || `Use ${item.toLowerCase()} as a checking clue.`
}

function stepTextMm(chapterNumber, item, index) {
  const chapterSteps = {
    1: [
      `ပို့ထားသောစာထဲတွင် "${item}" ကိုအရင်ရှာပါ။ Comment ထဲက ခန့်မှန်းပြောဆိုချက်ကို မူရင်းအချက်အလက်အဖြစ် မယူပါနှင့်။`,
      `"${item}" သည် နာမည်၊ ရက်စွဲနှင့် အထောက်အထားတို့ဖြင့် ကိုက်ညီမှုရှိမရှိ စစ်ပါ။`,
      `အချက်အလက်လုံလောက်မှသာ မျှဝေပါ။ မလုံလောက်သေးလျှင် ထပ်မံစစ်ဆေးပါ။`,
    ],
    2: [
      `ဓာတ်ပုံ၊ ဗီဒီယို သို့မဟုတ် စာတန်းထဲတွင် "${item}" ကိုရှာပါ။`,
      `"${item}" တစ်ခုတည်းကိုမယုံဘဲ နောက်ထပ်အထောက်အထားနှင့် နှိုင်းယှဉ်ပါ။`,
      `တွေ့ရသောအချက်သည် စာတန်းနှင့်ကိုက်ညီလား၊ မကိုက်ညီလား၊ မသေချာသေးလား သတ်မှတ်ပါ။`,
    ],
    3: [
      `"${item}" ကိုအသုံးပြုပြီး လူကိုမတိုက်ခိုက်ဘဲ မှားနိုင်သောအချက်ကိုသာ ရှင်းပြပါ။`,
      `Group chat တွင် ပို့လို့ရအောင် တိုတိုရှင်းရှင်းရေးပါ။`,
      `စာကြောင်းသည် စကားများမှုကိုလျှော့ပြီး အထောက်အထားဆီ ပြန်ညွှန်နိုင်လား စစ်ပါ။`,
    ],
  }

  return chapterSteps[chapterNumber][index] || `"${item}" ကို စစ်ဆေးရမည့်အချက်အဖြစ် သုံးပါ။`
}

function exampleAnswer(chapterNumber, title, habit) {
  if (chapterNumber === 1) {
    return `I will not forward this yet. I need to check ${habit.toLowerCase()} for the "${title}" claim first.`
  }

  if (chapterNumber === 2) {
    return `This media is not ready to trust yet. I found the key clue for "${title}", but I still need a matching source or older copy.`
  }

  return `Thanks for sharing. I checked "${title}" and found a safer source. Let's pause this claim until we confirm it.`
}

function commonMistake(chapterNumber, title) {
  if (chapterNumber === 1) {
    return `Do not treat confidence as proof. A post about "${title}" can sound certain and still be unsupported.`
  }

  if (chapterNumber === 2) {
    return `Do not trust a caption just because the image looks real. Real media can be reused with a false story.`
  }

  return `Do not embarrass the sender. Correcting the claim works better when the person can still feel respected.`
}

function exampleAnswerMm(chapterNumber, title, habit) {
  const mmTitle = toMyanmarTitle(title)
  const mmHabit = toMyanmarHabitPhrase(habit)
  if (chapterNumber === 1) {
    return `ဒီ "${mmTitle}" အကြောင်းအရာကို အခုမမျှဝေသေးပါ။ ${mmHabit} ကို အရင်စစ်ပါမယ်။`
  }

  if (chapterNumber === 2) {
    return `ဒီမီဒီယာကို ယုံရန် မလုံလောက်သေးပါ။ "${mmTitle}" အတွက် သတိထားစရာတွေ့ပေမယ့် မူရင်းအရင်းအမြစ် သို့မဟုတ် copy ဟောင်းကို ထပ်ရှာပါမယ်။`
  }

  return `မျှဝေပေးတာ ကျေးဇူးပါ။ "${mmTitle}" ကိုစစ်ကြည့်ပြီး ယုံကြည်ရသောအရင်းအမြစ်တစ်ခု တွေ့ပါတယ်။ အတည်မပြုမချင်း ခဏရပ်ထားကြရအောင်။`
}

function commonMistakeMm(chapterNumber, title) {
  const mmTitle = toMyanmarTitle(title)
  if (chapterNumber === 1) {
    return `"${mmTitle}" အကြောင်းအရာသည် ယုံကြည်စရာကောင်းသလို ရေးထားသော်လည်း အထောက်အထားမရှိနိုင်ပါ။`
  }

  if (chapterNumber === 2) {
    return `ဓာတ်ပုံမှန်နေပေမယ့် စာတန်းမှန်မယ်လို့ မယူဆပါနှင့်။ မီဒီယာအဟောင်းကို အကြောင်းအရာအသစ်တစ်ခုလို ပြန်သုံးနိုင်သည်။`
  }

  return `ပို့သူကို အရှက်မပေးပါနှင့်။ လူကိုလေးစားထားပြီး မှားနိုင်သောအချက်ကိုသာ ရှင်းပြပါ။`
}

function toMyanmarWhy(chapterNumber, title) {
  const mmTitle = toMyanmarTitle(title)
  if (chapterNumber === 1) {
    return `"${mmTitle}" အကြောင်း လူများနေရာအနှံ့မျှဝေနေသော post များတွင် မူရင်းအရင်းအမြစ်၊ ရက်စွဲနှင့် အထောက်အထား မပြည့်စုံပါက မှားယွင်းစွာမျှဝေမိနိုင်သည်။`
  }

  if (chapterNumber === 2) {
    return `"${mmTitle}" တွင် ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုမှန်နေပေမယ့် စာတန်းပြောင်းထားပါက အဓိပ္ပာယ်မှားစေနိုင်သည်။`
  }

  return `"${mmTitle}" တွင် ကောင်းမွန်သောပြန်ရှင်းချက်သည် အေးဆေး၊ တိုတောင်းပြီး ယုံကြည်ရသောအရင်းအမြစ်ပါရမည်။ လူကိုကာကွယ်ပြီး အချက်အလက်ကိုသာပြင်ပါ။`
}

function toMyanmarCase(chapterNumber, title) {
  const mmTitle = toMyanmarTitle(title)
  if (chapterNumber === 1) {
    return `Group chat ထဲတွင် "${mmTitle}" အကြောင်း post တစ်ခုကို လူများစွာမျှဝေနေပြီး ချက်ချင်းထပ်မျှဝေရန် တိုက်တွန်းထားသည်။`
  }

  if (chapterNumber === 2) {
    return `"${mmTitle}" အကြောင်း ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုတစ်ခုကို ဒီနေ့ဖြစ်ပျက်သလို စာတန်းတပ်ပြီး မျှဝေထားသည်။`
  }

  return `မိတ်ဆွေတစ်ယောက်က "${mmTitle}" အကြောင်း ကောလာဟလတစ်ခုကို မိသားစု/group chat ထဲတွင် မျှဝေထားသည်။`
}

function toMyanmarTitle(title) {
  return (myanmarTitles && myanmarTitles[title]) || title
}

function toMyanmarHabit(item) {
  return myanmarHabitWords[item] || item
}

function toMyanmarHabitPhrase(habit) {
  return habit
    .split(' · ')
    .map((item) => toMyanmarHabit(item))
    .join('၊ ')
}

const myanmarHabitWords = {
  Sender: 'ပို့သူ',
  Account: 'အကောင့်',
  Contact: 'ဆက်သွယ်ရန်အချက်အလက်',
  Pause: 'ခဏရပ်ခြင်း',
  Breathe: 'စိတ်အေးအေးထားခြင်း',
  Check: 'စစ်ဆေးခြင်း',
  Headline: 'ခေါင်းစဉ်',
  Body: 'အကြောင်းအရာအပြည့်အစုံ',
  Match: 'ကိုက်ညီမှု',
  Claim: 'ပြောဆိုထားသောအချက်',
  Proof: 'အထောက်အထား',
  Link: 'လင့်ခ်',
  Date: 'ရက်စွဲ',
  Event: 'ဖြစ်ရပ်',
  Today: 'ယနေ့ဖြစ်ရပ်',
  Original: 'မူရင်း',
  Copy: 'ကူးယူမျှဝေထားသောစာ',
  Source: 'အရင်းအမြစ်',
  Feeling: 'ခံစားချက်',
  Pressure: 'ဖိအားပေးမှု',
  Health: 'ကျန်းမာရေးအချက်',
  Expert: 'ကျွမ်းကျင်သူအရင်းအမြစ်',
  Evidence: 'အထောက်အထား',
  Fact: 'အချက်အလက်',
  Opinion: 'ထင်မြင်ချက်',
  Quote: 'ကိုးကားချက်',
  Person: 'လူပုဂ္ဂိုလ်',
  Record: 'မှတ်တမ်း',
  Screenshot: 'စခရင်ရှော့',
  Context: 'နောက်ခံအကြောင်းအရာ',
  Number: 'ကိန်းဂဏန်း',
  Method: 'တွက်ချက်ပုံ',
  Pattern: 'ပုံစံတူဖြစ်မှု',
  Repeat: 'ထပ်တူမျှဝေမှု',
  Harm: 'ထိခိုက်နိုင်မှု',
  Audience: 'မြင်ရမည့်လူအုပ်စု',
  Care: 'ဂရုစိုက်မှု',
  Ask: 'မေးမြန်းခြင်း',
  Verify: 'အတည်ပြုခြင်း',
  Decide: 'ဆုံးဖြတ်ခြင်း',
  Save: 'သိမ်းဆည်းခြင်း',
  Time: 'အချိန်',
  Label: 'အညွှန်း',
  Next: 'နောက်တစ်ဆင့်',
  'Source A': 'အရင်းအမြစ် ၁',
  'Source B': 'အရင်းအမြစ် ၂',
  Forward: 'ထပ်ဆင့်မျှဝေခြင်း',
  Responsibility: 'တာဝန်ယူမှု',
  Unsure: 'မသေချာမှု',
  Wait: 'စောင့်ဆိုင်းခြင်း',
  Image: 'ဓာတ်ပုံ',
  Caption: 'စာတန်း',
  Older: 'အဟောင်းဖြစ်နိုင်မှု',
  Sign: 'ဆိုင်းဘုတ်/လက္ခဏာ',
  Place: 'နေရာ',
  Weather: 'ရာသီဥတု',
  Before: 'မဖြစ်မီ',
  After: 'ဖြစ်ပြီးနောက်',
  Clip: 'ဗီဒီယိုအပိုင်းတို',
  Audio: 'အသံ',
  Zoom: 'ချဲ့ကြည့်ခြင်း',
  Detail: 'အသေးစိတ်အချက်',
  Clue: 'သတိထားရမည့်အချက်',
  Hands: 'လက်ပုံစံ',
  Text: 'စာလုံးပုံစံ',
  Shadow: 'အရိပ်',
  Light: 'အလင်း',
  Direction: 'ဦးတည်ရာ',
  Logo: 'လိုဂို',
  Uniform: 'ယူနီဖောင်း',
  Map: 'မြေပုံ',
  Distance: 'အကွာအဝေး',
  Crop: 'ဖြတ်တောက်ထားမှု',
  Frame: 'မြင်ကွင်းဘောင်',
  Comment: 'မှတ်ချက်',
  Official: 'တရားဝင်အရင်းအမြစ်',
  Local: 'ဒေသဆိုင်ရာအရင်းအမြစ်',
  Update: 'နောက်ဆုံးထုတ်ပြန်ချက်',
  Satire: 'ဟာသ/လှောင်ပြောင်စာ',
  Tone: 'ရေးသားပုံသံ',
  Face: 'မျက်နှာပုံစံ',
  Feature: 'အသေးစိတ်လက္ခဏာ',
  Consistency: 'တစ်သမတ်တည်းရှိမှု',
  Privacy: 'ကိုယ်ရေးလုံခြုံမှု',
  Safety: 'လုံခြုံမှု',
  Checklist: 'စစ်ဆေးရန်စာရင်း',
  Calm: 'စိတ်အေးအေးထားမှု',
  Confidence: 'ယုံကြည်မှုအဆင့်',
  Humility: 'မသေချာမှုကိုဝန်ခံခြင်း',
  Kind: 'နူးညံ့မှု',
  Respect: 'လေးစားမှု',
  Private: 'သီးသန့်ပြောဆိုမှု',
  Dignity: 'ဂုဏ်သိက္ခာ',
  Trust: 'ယုံကြည်မှု',
  Question: 'မေးခွန်း',
  Invite: 'ဖိတ်ခေါ်ခြင်း',
  Known: 'သိရှိပြီးအချက်',
  Unknown: 'မသိသေးသောအချက်',
  Honest: 'ရိုးသားမှု',
  Group: 'အုပ်စု',
  People: 'လူများ',
  Protect: 'ကာကွယ်ခြင်း',
  Hate: 'အမုန်းစကား',
  Limit: 'ကန့်သတ်ခြင်း',
  Report: 'တိုင်ကြားခြင်း',
  Channel: 'အသုံးပြုမည့်လမ်းကြောင်း',
  Help: 'အကူအညီ',
  Thanks: 'ကျေးဇူးတင်ခြင်း',
  Concern: 'စိုးရိမ်ပေးမှု',
  Correction: 'ပြန်ရှင်းချက်',
  Plain: 'ရိုးရှင်းသောစကား',
  Short: 'တိုတောင်းမှု',
  Clear: 'ရှင်းလင်းမှု',
  Share: 'မျှဝေခြင်း',
  Own: 'ကိုယ်တိုင်တာဝန်ယူခြင်း',
  Correct: 'ပြန်ပြင်ခြင်း',
  Repair: 'ပြန်ပြင်ဆင်ခြင်း',
  Money: 'ငွေ',
  Codes: 'ကုဒ်များ',
  Family: 'မိသားစု',
  Safe: 'လုံခြုံမှု',
  Result: 'စစ်ဆေးပြီးရလဒ်',
  Team: 'အတူတကွလုပ်ဆောင်မှု',
  Learn: 'လေ့လာခြင်း',
}

var myanmarTitles = {
  'Check the sender': 'ပို့သူကိုစစ်ပါ',
  'Slow urgent posts': 'အရေးပေါ်ဆိုသောစာကို ခဏရပ်စစ်ပါ',
  'Read past the headline': 'ခေါင်းစဉ်ထက်ပိုပြီး ဖတ်ပါ',
  'Spot missing evidence': 'မပါတဲ့အထောက်အထားကို သတိထားပါ',
  'Check dates': 'ရက်စွဲကိုစစ်ပါ',
  'Trace the first source': 'မူရင်းအရင်းအမြစ်ကိုရှာပါ',
  'Watch emotional hooks': 'ခံစားချက်ဆွဲဆောင်မှုကိုသတိထားပါ',
  'Notice miracle cures': 'အံ့ဖွယ်ကုသနည်းများကိုသတိထားပါ',
  'Separate fact and opinion': 'အချက်အလက်နှင့် ထင်မြင်ချက်ကိုခွဲပါ',
  'Check quoted names': 'ကိုးကားထားသောနာမည်ကိုစစ်ပါ',
  'Verify screenshots': 'စခရင်ရှော့ကိုအတည်ပြုပါ',
  'Check numbers': 'နံပါတ်/စာရင်းကိုစစ်ပါ',
  'Look for copy-paste rumors': 'ထပ်တူကူးထားသောကောလာဟလကိုရှာပါ',
  'Avoid shame-sharing': 'အရှက်ပေးမျှဝေခြင်းရှောင်ပါ',
  'Use a trusted adult': 'ယုံကြည်ရသူထံမေးပါ',
  'Save useful evidence': 'အသုံးဝင်သောအထောက်အထားကိုသိမ်းပါ',
  'Check platform labels': 'Platform ပေါ်ကအညွှန်းများကိုစစ်ပါ',
  'Compare two sources': 'အရင်းအမြစ်နှစ်ခုကိုနှိုင်းယှဉ်ပါ',
  'Pause before forwarding': 'ထပ်ဆင့်မမျှဝေခင် ခဏရပ်ပါ',
  'Make the safe call': 'လုံခြုံသောဆုံးဖြတ်ချက်ချပါ',
  'Match image and caption': 'ဓာတ်ပုံနှင့်စာတန်း ကိုက်ညီမှုစစ်ပါ',
  'Search older copies': 'အဟောင်းကူးယူထားမှုများရှာပါ',
  'Check location clues': 'နေရာပြသောလက္ခဏာများစစ်ပါ',
  'Inspect video cuts': 'ဗီဒီယိုဖြတ်တောက်ထားမှုကိုစစ်ပါ',
  'Notice audio mismatch': 'အသံမကိုက်ညီမှုကိုသတိထားပါ',
  'Read image details': 'ဓာတ်ပုံအသေးစိတ်ဖတ်ပါ',
  'Check AI smoothness': 'AI ပုံရိပ်လက္ခဏာများစစ်ပါ',
  'Look at lighting': 'အလင်းနှင့်အရိပ်စစ်ပါ',
  'Compare weather reports': 'ရာသီဥတုမှတ်တမ်းများနှိုင်းယှဉ်ပါ',
  'Verify uniforms and logos': 'ယူနီဖောင်းနှင့်လိုဂိုကိုစစ်ပါ',
  'Check map distance': 'မြေပုံအကွာအဝေးကိုစစ်ပါ',
  'Avoid cropped conclusions': 'ဖြတ်တောက်ထားသောပုံကြောင့် မှားမဆုံးဖြတ်ပါနှင့်',
  'Read comments carefully': 'မှတ်ချက်များကိုသတိထားဖတ်ပါ',
  'Check official updates': 'တရားဝင်ထုတ်ပြန်ချက်ကိုစစ်ပါ',
  'Separate satire': 'ဟာသ/လှောင်ပြောင်စာကိုခွဲခြားပါ',
  'Test before/after claims': 'မဖြစ်မီ/ဖြစ်ပြီးနောက်ပုံများကိုစစ်ပါ',
  'Watch generated faces': 'AI ဖြင့်ဖန်တီးထားသောမျက်နှာများကိုသတိထားပါ',
  'Keep privacy in mind': 'ကိုယ်ရေးလုံခြုံမှုကိုကာကွယ်ပါ',
  'Build a media checklist': 'မီဒီယာစစ်ဆေးရန်စာရင်းတည်ဆောက်ပါ',
  'Choose a confidence level': 'ယုံကြည်မှုအဆင့်ပြပါ',
  'Start kindly': 'ယဉ်ကျေးစွာစပါ',
  'Correct the claim': 'မှားနိုင်သောအချက်ကိုသာပြင်ပါ',
  'Use one clear source': 'ရှင်းလင်းသောအရင်းအမြစ်တစ်ခုသုံးပါ',
  'Avoid public shaming': 'အများရှေ့အရှက်ပေးခြင်းကိုရှောင်ပါ',
  'Ask a gentle question': 'မေးခွန်းကိုနူးညံ့စွာမေးပါ',
  'Share uncertainty honestly': 'မသေချာမှုကိုရိုးသားစွာပြောပါ',
  'Calm group chats': 'Group chat ကိုအေးဆေးစေပါ',
  'Protect vulnerable people': 'ထိခိုက်လွယ်သူများကိုကာကွယ်ပါ',
  'Do not amplify hate': 'အမုန်းစကားမဖြန့်ပါနှင့်',
  'Choose the right channel': 'မှန်ကန်သောလမ်းကြောင်းကိုရွေးပါ',
  'Thank the sharer': 'မျှဝေသူကိုကျေးဇူးတင်ပါ',
  'Use plain language': 'ရိုးရှင်းသောစကားသုံးပါ',
  'Invite a pause': 'ခဏရပ်ရန်ဖိတ်ခေါ်ပါ',
  'Repair after sharing': 'မှားမျှဝေပြီးနောက်ပြင်ပါ',
  'Report harmful scams': 'အန္တရာယ်ရှိလိမ်လည်မှုကိုတိုင်ကြားပါ',
  'Handle family rumors': 'မိသားစုကောလာဟလကိုယဉ်ကျေးစွာကိုင်တွယ်ပါ',
  'Keep screenshots safe': 'စခရင်ရှော့ကိုလုံခြုံစွာသိမ်းပါ',
  'De-escalate arguments': 'ငြင်းခုံမှုကိုလျှော့ပါ',
  'Encourage shared checking': 'အတူတကွစစ်ဆေးရန်အားပေးပါ',
  'Close the loop': 'စစ်ဆေးပြီးရလဒ်ကိုပြန်အသိပေးပါ',
}

export const chapters = chapterPlans.map((chapter) => ({
  ...chapter,
  lessons: chapter.topics.map(([title, body, habit, caseStudy], index) => makeLesson(chapter, index + 1, title, body, habit, caseStudy)),
}))

export const flashcards = chapters.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.game))

function buildGame(gameType, chapter, lessonNumber, title, habit, caseStudy, study) {
  if (gameType === 'timeline-fix') {
    return {
      title: { en: 'Build the safest order', mm: 'အလုံခြုံဆုံးအစီအစဉ်တည်ဆောက်ပါ' },
      scenario: { en: caseStudy, mm: study.caseStudy.mm },
      prompt: { en: 'Tap each step from first to last.', mm: 'ပထမမှနောက်ဆုံးအထိ နှိပ်ပါ။' },
      order: ['notice', 'check', 'compare', 'decide'],
      items: [
        { id: 'compare', label: { en: study.steps[1].en, mm: study.steps[1].mm } },
        { id: 'decide', label: { en: 'Decide what is safe to say or share', mm: 'ဘာပြောရင်/မျှဝေရင် လုံခြုံမလဲ ဆုံးဖြတ်ပါ' } },
        { id: 'notice', label: { en: 'Pause and name the claim', mm: 'ခဏရပ်ပြီး စစ်ရမည့်အချက်ကိုရှင်းရှင်းလင်းလင်းသတ်မှတ်ပါ' } },
        { id: 'check', label: { en: study.steps[0].en, mm: study.steps[0].mm } },
      ],
    }
  }

  if (gameType === 'choice-check') {
    return {
      title: { en: 'Pick the safest response', mm: 'အလုံခြုံဆုံးတုံ့ပြန်မှုရွေးပါ' },
      scenario: { en: caseStudy, mm: study.caseStudy.mm },
      prompt: { en: 'Choose the response that protects trust.', mm: 'ယုံကြည်မှုကိုကာကွယ်သောတုံ့ပြန်မှုကိုရွေးပါ။' },
      correct: 'safe',
      options: [
        { id: 'rush', label: { en: 'Forward it quickly', mm: 'ချက်ချင်း forward လုပ်မယ်' } },
        { id: 'mock', label: { en: 'Attack or mock the sender', mm: 'ပို့သူကိုတိုက်ခိုက်/လှောင်မယ်' } },
        { id: 'safe', label: { en: study.exampleAnswer.en, mm: study.exampleAnswer.mm } },
      ],
    }
  }

  return {
      title: { en: 'Spot the risky signals', mm: 'သတိထားရမည့်အချက်များရှာပါ' },
      scenario: { en: caseStudy, mm: study.caseStudy.mm },
      prompt: { en: 'Choose the strongest risky signal.', mm: 'အရေးကြီးဆုံး သတိထားရမည့်အချက်တစ်ခုကိုရွေးပါ။' },
    items: [
      { id: 'pressure', label: { en: study.commonMistake.en, mm: study.commonMistake.mm }, risky: true },
      { id: 'unknown', label: { en: `Missing: ${habit}`, mm: `မပြည့်စုံသေးသောအချက်: ${toMyanmarHabitPhrase(habit)}` }, risky: true },
      { id: 'care', label: { en: study.detectiveNote.en, mm: study.detectiveNote.mm }, risky: false },
      { id: 'case', label: { en: `Case topic: ${title}`, mm: `လေ့ကျင့်မည့်အကြောင်းအရာ: ${toMyanmarTitle(title)}` }, risky: false },
    ],
  }
}
