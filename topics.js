(function(root){
const topics={
  "health": {
    "title": {
      "en": "Health",
      "zh": "健康"
    },
    "baseline": {
      "en": "Read this season through your energy, rest, and everyday rhythms. The body’s quieter signals deserve a place in your plans.",
      "zh": "这一季，宜从精力、休息与日常节律里读懂自己的状态。身体那些轻声的提醒，也值得放进你的安排。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "This month’s symbolism favors replenishment. Let nourishment come before another demand on your reserves.",
          "zh": "本月的意象偏向滋养与回补。先让自己有所补充，再接住新的消耗。"
        },
        "action": {
          "en": "Choose one evening ritual—an earlier bedtime, a quiet meal, or ten minutes away from screens—and give it a steady place.",
          "zh": "选一个晚间小仪式：稍早入睡、安静吃一餐，或留十分钟远离屏幕，让它有固定的位置。"
        },
        "watch": {
          "en": "Support loses its warmth when every pause becomes another thing to optimize. Leave some rest unmeasured.",
          "zh": "若每一次休息都变成新的考核，滋养也会失去温度。留一点不必计量的休息。"
        },
        "quietAction": {
          "en": "Prepare a quieter evening: set out what you need for tomorrow, then leave the last ten minutes free of tasks.",
          "zh": "为晚间留一点安静：准备好明天需要的东西，再把最后十分钟从任务里空出来。"
        }
      },
      "peer": {
        "mood": {
          "en": "A steadier rhythm may be found in familiar company. Shared habits can hold you gently, if you keep your own pace.",
          "zh": "熟悉的陪伴里，或可找到更稳的节律。一起养成习惯能托住你，但步调仍要属于自己。"
        },
        "action": {
          "en": "Invite someone into one simple habit, such as a regular walk, while keeping its pace comfortable for you.",
          "zh": "邀一个人一起坚持简单的习惯，例如定期散步，同时把节奏留在自己舒适的范围。"
        },
        "watch": {
          "en": "Another person’s stamina is not your instruction. Notice when companionship starts turning into comparison.",
          "zh": "别人的精力并不是你的尺度。留意陪伴何时悄悄变成了比较。"
        },
        "quietAction": {
          "en": "Keep your own rhythm beside a shared habit; note what leaves you rested before adding another session.",
          "zh": "在共同习惯中保留自己的节奏，先记下什么让你得到休息，再增加新的安排。"
        }
      },
      "expression": {
        "mood": {
          "en": "The month invites gentle movement and release. Energy may feel clearer when it has a small, regular outlet.",
          "zh": "本月的意象邀请温和的活动与舒展。精力有了细小、规律的出口，感受或会更清明。"
        },
        "action": {
          "en": "Give one part of your day a light movement ritual, then leave room to recover afterward.",
          "zh": "给一天中的某个时段安排轻量活动，之后也为恢复留出空隙。"
        },
        "watch": {
          "en": "A bright impulse can spend tomorrow’s reserves. Keep the ritual small enough to repeat without forcing it.",
          "zh": "一时兴起，也可能花掉明天的余量。把仪式控制在无需勉强、能够重复的大小。"
        },
        "quietAction": {
          "en": "Replace one demanding activity with gentle movement that fits your actual energy today.",
          "zh": "把一项勉强的安排换成适合今天精力的轻量活动。"
        }
      },
      "structure": {
        "mood": {
          "en": "Your calendar may be asking for firmer edges. Here, the opening is a boundary that protects your energy.",
          "zh": "日程似乎需要更清楚的边界。此时的出口，或是一道替精力守门的界线。"
        },
        "action": {
          "en": "Protect a realistic window for sleep and meals before adding new commitments to the week.",
          "zh": "先在一周里守住现实可行的睡眠与用餐时段，再添新的安排。"
        },
        "watch": {
          "en": "Discipline can become another source of strain. If your routine feels punitive, soften it into something sustainable.",
          "zh": "自律若过紧，也会成为额外的负担。若作息像惩罚，不妨把它调成可持续的节奏。"
        },
        "quietAction": {
          "en": "Remove one avoidable demand from the week and use that space for a regular meal or a pause.",
          "zh": "从本周移去一项可避免的消耗，把腾出的时间留给一顿规律的饭或一次休息。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "This month favors tending what is already yours. A smaller, well-kept routine may offer more grounding than a dramatic reset.",
          "zh": "本月更适合照料已有的日常。一个被好好维持的小习惯，或比彻底重启更能让人落地。"
        },
        "action": {
          "en": "Keep a brief note of which routines leave you rested or depleted, and adjust one recurring drain.",
          "zh": "简短记录哪些安排让你恢复、哪些让你疲惫，再调整一项反复消耗你的习惯。"
        },
        "watch": {
          "en": "Do not turn every bodily sensation into a verdict. Persistent or concerning symptoms deserve professional care.",
          "zh": "不必把身体每一次起伏都解读成结论。持续或令人担忧的不适，应交给专业医疗评估。"
        },
        "quietAction": {
          "en": "Choose the routine that already helps you and make it easier to keep: prepare the space or adjust its timing.",
          "zh": "选一个已经有帮助的习惯，整理所需空间或调整时间，让它更容易维持。"
        }
      }
    }
  },
  "love": {
    "title": {
      "en": "Love",
      "zh": "爱情"
    },
    "baseline": {
      "en": "This reading traces the space between longing and reciprocity. An intention becomes clearer when it makes room for another person’s free choice.",
      "zh": "这份解读关注渴望与回应之间的距离。心愿若容得下对方自由选择，自己的方向也会更清楚。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "The month’s symbolism invites you to receive. Warmth has more room when you do not have to earn every gesture of care.",
          "zh": "本月的意象邀请你练习接纳。当每一份关心都不必靠证明自己来换取，温柔才有地方停留。"
        },
        "action": {
          "en": "Name one kind of connection you want, then make one gentle invitation that leaves space for an honest answer.",
          "zh": "说清自己想要的一种连接，再给出一次温和的邀请，让真实的回应有空间出现。"
        },
        "watch": {
          "en": "Longing can dress uncertainty as destiny. Let consistent behavior carry more weight than a beautiful sign.",
          "zh": "渴望有时会把不确定装扮成命定。让持续的行动，比动人的征兆更有分量。"
        },
        "quietAction": {
          "en": "Write the kind of care you would welcome, then give a small response of warmth when care is actually offered.",
          "zh": "写下自己愿意接住的关心，当真实的关心出现时，给它一份小小的温暖回应。"
        }
      },
      "peer": {
        "mood": {
          "en": "The mirror of companionship is prominent here. Attraction may reveal where your needs meet, and where each person needs their own room.",
          "zh": "本月的关系意象像一面镜子。吸引力或会照见需求相合之处，也照见彼此需要独立空间的地方。"
        },
        "action": {
          "en": "Create one low-pressure moment together, then notice whether attention and effort move in both directions.",
          "zh": "安排一次没有太多压力的相处，再留意关注与付出是否双向流动。"
        },
        "watch": {
          "en": "Chemistry does not require self-erasure. Keep the interests and friendships that make your life feel like yours.",
          "zh": "心动不需要以失去自己为代价。保留那些让生活仍属于你的兴趣与朋友。"
        },
        "quietAction": {
          "en": "Make room for a calm shared moment and notice whether you feel free to be yourself in it.",
          "zh": "为平静相处留一点时间，留意自己在其中是否可以自在地成为自己。"
        }
      },
      "expression": {
        "mood": {
          "en": "Something unspoken is asking for a kinder form. The month favors a clear offering of feeling over a carefully staged hint.",
          "zh": "尚未说出的心意，似乎在寻找更温柔的表达。本月适合清楚地递出感受，少一些精心安排的暗示。"
        },
        "action": {
          "en": "Share one specific appreciation or desire in your own words, without attaching a test to the response.",
          "zh": "用自己的话表达一份具体的欣赏或期待，不在回应里设置考验。"
        },
        "watch": {
          "en": "A grand gesture can obscure an unanswered need. Keep listening after you have said your part.",
          "zh": "盛大的表达也可能盖住尚未被回应的需求。说完自己的部分，仍要留出倾听的位置。"
        },
        "quietAction": {
          "en": "Draft the feeling you have been circling around; soften the wording before sharing it without a hidden test.",
          "zh": "先写下绕了很久的感受，把措辞放柔，再不带隐藏考验地说出来。"
        }
      },
      "structure": {
        "mood": {
          "en": "There is a knot here that softness alone may not loosen. Clear agreements can give affection a more dependable place to land.",
          "zh": "这一段里，或有温柔本身解不开的结。清楚的约定，能让感情找到更可靠的落点。"
        },
        "action": {
          "en": "Choose one unresolved boundary—time, exclusivity, or communication—and discuss it calmly and specifically.",
          "zh": "从时间安排、关系边界或沟通方式里，选一件悬而未决的事，平静而具体地谈清楚。"
        },
        "watch": {
          "en": "Do not mistake repeated disregard for a lesson you must endure. Your boundary remains valid without a cosmic explanation.",
          "zh": "反复被忽视，不必被解释成必须承受的课题。你的边界无需宇宙的理由，也依然成立。"
        },
        "quietAction": {
          "en": "Name one boundary privately first, then choose a calm moment to explain what you can and cannot offer.",
          "zh": "先独自写清一道边界，再选一个平静时刻，说出自己能够与不能够给予什么。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "The month turns toward the way love is tended. Small, mutual acts may reveal more than trying to secure the whole future at once.",
          "zh": "本月的重心落在如何照料关系。细小而相互的行动，或比一次确认整个未来更能说明心意。"
        },
        "action": {
          "en": "Invest in one recurring act of connection, and ask whether it feels welcome rather than assuming it does.",
          "zh": "认真做一件能重复的连接小事，也询问它是否被欢迎，不只凭自己的想象。"
        },
        "watch": {
          "en": "Tending a bond is different from directing another person. Leave their choices beyond the reach of your manifestation ritual.",
          "zh": "照料关系与安排对方的人生之间，有一道细线。显化自己的愿望时，也给对方的选择留白。"
        },
        "quietAction": {
          "en": "Ask which small gesture feels welcome, then keep your effort at a pace that leaves room for reciprocity.",
          "zh": "询问怎样的小举动会被欢迎，再以容得下相互回应的节奏投入。"
        }
      }
    }
  },
  "family": {
    "title": {
      "en": "Family",
      "zh": "家庭"
    },
    "baseline": {
      "en": "This season is read through belonging, shared duties, and the space you need to remain yourself. A peaceful home can hold both care and a clear boundary.",
      "zh": "这一季，从归属、共同责任与保留自我的空间来读家庭。安稳的家，可以同时容纳关心与清楚的边界。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "The month’s imagery makes room for receiving care. An old burden may feel less solitary when help is named and made practical.",
          "zh": "本月的意象，为接住关心留出位置。把帮助说清、落到实处，旧有的负担或不再需要独自承受。"
        },
        "action": {
          "en": "Ask for one concrete form of help with a shared responsibility, and agree on what that help includes.",
          "zh": "为一项共同责任提出具体的帮助请求，也约定这份帮助包含什么。"
        },
        "watch": {
          "en": "Care can arrive with expectations attached. Accept what helps while keeping promises within your actual capacity.",
          "zh": "关心有时也夹带期待。接住有用的部分，同时把承诺留在自己的真实能力之内。"
        },
        "quietAction": {
          "en": "List one task that feels heavy and the specific help that would ease it before bringing it to the family.",
          "zh": "先写清一项让你吃力的任务，以及什么具体协助能够减轻它，再和家人谈。"
        }
      },
      "peer": {
        "mood": {
          "en": "Shared history is close to the surface. The opening lies in meeting as you are now, rather than repeating the roles you inherited.",
          "zh": "共同的旧事，似乎更容易浮上来。转动的空间在于按今天的彼此相处，少一些沿袭旧角色的惯性。"
        },
        "action": {
          "en": "Create a simple shared ritual, and invite each person to choose how they take part.",
          "zh": "安排一个简单的家庭小仪式，让每个人选择适合自己的参与方式。"
        },
        "watch": {
          "en": "Familiarity can make assumptions sound like facts. Leave room for a family member to have changed.",
          "zh": "熟悉有时会让猜测听起来像事实。给家人留一点已经改变的可能。"
        },
        "quietAction": {
          "en": "Reconnect through a familiar meal or memory, while allowing each person to choose how much they share.",
          "zh": "从一顿熟悉的饭或一段回忆重新联结，也允许每个人选择分享多少。"
        }
      },
      "expression": {
        "mood": {
          "en": "Words can reshape the atmosphere of home this month. A feeling named without accusation may open a little more space between old reactions.",
          "zh": "本月的家庭意象偏向表达。少些指责地说出感受，或能在旧有反应之间打开一点空间。"
        },
        "action": {
          "en": "Put one need into a specific request: what you need, from whom, and when it would help.",
          "zh": "把一项需要化成具体请求：需要什么、希望谁来协助、什么时候最有帮助。"
        },
        "watch": {
          "en": "One honest conversation cannot carry every old grievance. Choose a single thread before opening the whole knot.",
          "zh": "一次坦诚的谈话，未必托得住所有旧事。先理一根线，再考虑整个结。"
        },
        "quietAction": {
          "en": "Put your request into a short message and remove the old accusations before deciding when to share it.",
          "zh": "把请求写成一段短话，先移去旧的指责，再决定何时说出来。"
        }
      },
      "structure": {
        "mood": {
          "en": "Household duties and unspoken rules may need clearer edges. The path softens when responsibility stops relying on someone’s silent sacrifice.",
          "zh": "家中的责任与默契，或需要更清楚的轮廓。责任不再靠某个人默默牺牲维持，路才可能松一些。"
        },
        "action": {
          "en": "Make one recurring duty visible, then agree on a realistic division and a time to revisit it.",
          "zh": "把一项反复发生的家务或照顾任务摆到明处，约定现实可行的分工与回顾时间。"
        },
        "watch": {
          "en": "Peace bought through constant self-silencing is costly. A calm boundary can belong inside family care.",
          "zh": "总靠压下自己来换取平静，代价并不轻。平和的边界，也可以长在亲情之中。"
        },
        "quietAction": {
          "en": "Write down who currently carries one household duty and what a fairer division could realistically look like.",
          "zh": "写下某项家庭责任目前由谁承担，以及现实中更公平的分工可以是什么样子。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "This month favors tending the household’s foundations. A practical detail put in order can create room for a gentler atmosphere.",
          "zh": "本月适合照料家庭的基础。理顺一处实际的小事，或能为更温和的相处腾出空间。"
        },
        "action": {
          "en": "Organize one shared plan—visits, expenses, or caregiving—and let the people involved shape it with you.",
          "zh": "整理一项共同安排，例如探访、开支或照顾计划，并让相关的人一起参与决定。"
        },
        "watch": {
          "en": "Holding everything together can become holding everything alone. Leave other people a real share of responsibility.",
          "zh": "把一切撑住，也可能变成独自承担一切。给其他人留出真实的责任份额。"
        },
        "quietAction": {
          "en": "Review one shared plan in a quieter conversation, leaving each person a clear piece to own.",
          "zh": "用一次安静的交谈回看共同安排，让每个人有一份清楚属于自己的责任。"
        }
      }
    }
  },
  "career": {
    "title": {
      "en": "Career",
      "zh": "事业"
    },
    "baseline": {
      "en": "This season follows the meeting of skill, visibility, and capacity. Your intention gains a clearer shape when it names the work you want to be known for.",
      "zh": "这一季，关注能力、被看见与承载力如何相遇。说清希望因什么工作被记住，心愿也会有更明确的形状。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "The month’s imagery favors groundwork and guidance. A useful opening may begin with better preparation rather than a louder entrance.",
          "zh": "本月的意象偏向积累与指引。值得留意的入口，或从更扎实的准备开始。"
        },
        "action": {
          "en": "Ask a trusted colleague for feedback on one work sample, then use it to strengthen a specific skill.",
          "zh": "请一位可信的同行评价一份具体作品，再据此补强一项明确的能力。"
        },
        "watch": {
          "en": "Learning can become a shelter from being seen. Give preparation a finish line and your work a next audience.",
          "zh": "学习有时也会成为躲开展示的地方。给准备设一个终点，也为作品安排下一位观众。"
        },
        "quietAction": {
          "en": "Revise one work sample using feedback you already have, and prepare a concise account of what it demonstrates.",
          "zh": "用已有反馈修改一份作品，再准备几句话，说清它展示了什么能力。"
        }
      },
      "peer": {
        "mood": {
          "en": "Your field of allies and competitors is in focus. Progress may feel clearer when your own contribution has a distinct name.",
          "zh": "同伴与竞争的意象在本月更突出。能清楚说出自己的贡献，前路或会更易辨认。"
        },
        "action": {
          "en": "Enter one useful collaboration with clear roles, credit, and a shared definition of completion.",
          "zh": "开展一次有用的合作，事先说清分工、署名与怎样算完成。"
        },
        "watch": {
          "en": "Comparison can borrow your ambition and steer it elsewhere. Check whether the next goal belongs to you.",
          "zh": "比较有时会借走你的野心，再把它带向别处。留意下一个目标是否真属于自己。"
        },
        "quietAction": {
          "en": "Review the roles in an existing collaboration and make your contribution visible in a short shared update.",
          "zh": "回看现有合作的分工，用一份简短的共同进度说明，让自己的贡献可见。"
        }
      },
      "expression": {
        "mood": {
          "en": "The month invites your work into the light. A visible, finished piece may give your intention more substance than another private plan.",
          "zh": "本月的意象邀请作品走到光里。一份可以看见的完成品，或比又一份私下计划更能托住心愿。"
        },
        "action": {
          "en": "Publish, present, or send one bounded piece of work to the audience it was made for.",
          "zh": "把一份范围明确的作品发布、展示，或交给它真正面向的人。"
        },
        "watch": {
          "en": "Visibility can scatter your attention. Protect the hours needed to finish before promising another public step.",
          "zh": "被看见也可能分散注意力。先守住完成所需的时间，再许诺下一次公开动作。"
        },
        "quietAction": {
          "en": "Refine a finished piece for one specific audience, then choose a modest setting to share it.",
          "zh": "为一个明确的对象打磨完成品，再选择合适的小范围展示它。"
        }
      },
      "structure": {
        "mood": {
          "en": "Expectations may feel closer to the skin this month. The opening lies in turning vague pressure into a clear scope you can work with.",
          "zh": "本月的要求，或显得更贴身。把模糊的压力转成清楚、可处理的范围，是值得寻找的出口。"
        },
        "action": {
          "en": "Clarify one deadline, priority, or success criterion in writing, and name the resources it requires.",
          "zh": "书面确认一项截止时间、优先级或完成标准，并说明它需要哪些资源。"
        },
        "watch": {
          "en": "Urgency does not automatically make a task yours. Check ownership before absorbing another person’s unfinished work.",
          "zh": "紧急并不自动意味着该由你承担。接住别人的未完成之前，先确认责任归属。"
        },
        "quietAction": {
          "en": "Map the work already promised and identify one scope adjustment before negotiating another commitment.",
          "zh": "列出已经答应的工作，在接下一个承诺前，先找出一处需要调整的范围。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "This month favors directing effort toward something concrete. A careful choice of where your time goes may be the quiet turn in the path.",
          "zh": "本月适合把力气落向具体之处。认真选择时间去哪里，或就是路上那次安静的转向。"
        },
        "action": {
          "en": "Choose one project with a clear owner, manageable scope, and a result you can actually deliver.",
          "zh": "选一项负责人明确、范围可控、自己能够交付成果的项目。"
        },
        "watch": {
          "en": "A promising opportunity still needs a realistic exchange. Look at effort, recognition, and compensation before committing.",
          "zh": "看似有吸引力的机会，也需要现实的交换。投入之前，看看付出、认可与报酬是否相称。"
        },
        "quietAction": {
          "en": "Compare one opportunity with the time and resources it actually needs, and prepare the questions that remain unanswered.",
          "zh": "对照一个机会真正需要的时间与资源，准备好那些尚未被回答的问题。"
        }
      }
    }
  },
  "study": {
    "title": {
      "en": "Study",
      "zh": "学业"
    },
    "baseline": {
      "en": "This season is read through attention, understanding, and the courage to try what you are learning. Knowledge takes root through a rhythm you can return to.",
      "zh": "这一季，从专注、理解与尝试所学的勇气来读学业。知识生根，需要一套你能反复回到的节律。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "The month’s symbolism favors foundations and guidance. A missing piece may become easier to see with a clearer explanation or a better source.",
          "zh": "本月的意象偏向基础与引导。一份更清楚的解释，或一处更可靠的资料，可能帮助你看见缺失的环节。"
        },
        "action": {
          "en": "Choose one weak concept, work through a trusted explanation, and test it with a small example of your own.",
          "zh": "选一个理解薄弱的概念，读懂可信的讲解，再用自己的小例子检验它。"
        },
        "watch": {
          "en": "Collecting material can imitate learning. Close the resource list long enough to recall what you have understood.",
          "zh": "收集资料有时会像是在学习。暂时合上清单，试着复述自己真正理解了什么。"
        },
        "quietAction": {
          "en": "Return to one explanation you nearly understood, then write the missing step in your own words.",
          "zh": "回到一个差一点懂透的讲解，用自己的话补上缺失的那一步。"
        }
      },
      "peer": {
        "mood": {
          "en": "Learning beside others is highlighted here. A shared rhythm can help, if you let different speeds coexist.",
          "zh": "本月的学业意象落在同伴。共同节奏或能有所帮助，也要容得下不同的速度。"
        },
        "action": {
          "en": "Study one topic with a partner, and take turns explaining it without looking at your notes.",
          "zh": "和一位同伴学习一个主题，轮流合上笔记讲清它。"
        },
        "watch": {
          "en": "Another person’s timeline need not become your measure of worth. Track your own gaps and progress.",
          "zh": "别人的进度，不必变成衡量自己的价值尺度。记录自己的缺口与进步。"
        },
        "quietAction": {
          "en": "Prepare a short explanation for a study partner and mark the point where you still need help.",
          "zh": "为学习伙伴准备一段简短讲解，也标出仍需要帮助的地方。"
        }
      },
      "expression": {
        "mood": {
          "en": "What you know is asking to be used. A small attempt may reveal the next learning edge more clearly than continued rehearsal.",
          "zh": "所学似乎在等待被使用。一次小尝试，或比反复预演更能照见下一处需要补足的地方。"
        },
        "action": {
          "en": "Make one small project, practice answer, or explanation that uses this week’s learning.",
          "zh": "做一个小作品、一份练习答案或一段讲解，用上本周所学。"
        },
        "watch": {
          "en": "Fluency can hide a shallow foundation. Check the step you find hardest to explain.",
          "zh": "说得流畅，也可能掩住基础的空隙。检查那一步你最难讲清的推理。"
        },
        "quietAction": {
          "en": "Try a small practice task without notes, then correct the part where your explanation loses its thread.",
          "zh": "合上笔记尝试一项小练习，再订正自己讲不连贯的那部分。"
        }
      },
      "structure": {
        "mood": {
          "en": "Deadlines and standards come into focus in this month’s imagery. A narrow, repeatable plan may loosen the pressure around the whole task.",
          "zh": "本月的意象把期限与标准推到眼前。一份小而可重复的计划，或能松开围绕整个任务的压力。"
        },
        "action": {
          "en": "Work backward from the nearest deadline and set two realistic practice sessions with a specific target.",
          "zh": "从最近的截止时间倒推，安排两次目标具体、现实可行的练习。"
        },
        "watch": {
          "en": "A rigid schedule can spend the attention it means to protect. Leave recovery between demanding sessions.",
          "zh": "过硬的安排，也可能耗掉本想守住的专注。高强度学习之间，留一点恢复。"
        },
        "quietAction": {
          "en": "Sort the next deadline into essential and optional work, then protect one focused session for the essentials.",
          "zh": "把下一个期限前的任务分成必要与可选，先为必要部分守住一次专注时间。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "The month favors choosing what deserves sustained attention. A smaller field of study may let understanding deepen.",
          "zh": "本月适合选择哪些内容值得持续投入。把学习范围收小，理解或更容易往深处走。"
        },
        "action": {
          "en": "Choose one core skill, set aside the optional material, and review mistakes from a recent attempt.",
          "zh": "选一项核心能力，暂缓可选资料，再复盘最近一次尝试中的错误。"
        },
        "watch": {
          "en": "Trying to master every branch can weaken the roots. Keep one priority visible until you can use it with confidence.",
          "zh": "急着掌握每个枝节，反而容易顾不上根。让一个重点留在眼前，直到能够稳妥地使用。"
        },
        "quietAction": {
          "en": "Review a recent mistake and choose one underlying skill to practice again before adding new material.",
          "zh": "复盘最近的一次错误，先重练其中一项基础能力，再添新资料。"
        }
      }
    }
  },
  "wealth": {
    "title": {
      "en": "Wealth",
      "zh": "财富"
    },
    "baseline": {
      "en": "This season is read through resources, habits, and the space between desire and enough. Abundance takes a more grounded shape when you know what your money is asked to carry.",
      "zh": "这一季，从资源、习惯与想要和足够之间的距离来读财富。知道钱需要承载什么，丰盛的心愿才更有落点。"
    },
    "relations": {
      "support": {
        "mood": {
          "en": "The month’s symbolism favors a steadier foundation. Useful information and a clearer view of your resources can make the next choice less hurried.",
          "zh": "本月的意象偏向稳固基础。有用的信息与更清楚的资源盘点，或能让下一次选择少些仓促。"
        },
        "action": {
          "en": "Gather your recurring expenses and existing reserves in one place, then identify one gap in your plan.",
          "zh": "把固定开支与现有储备整理在一处，再找出计划中的一个缺口。"
        },
        "watch": {
          "en": "An encouraging story is not proof of a financial promise. Read the terms and check the source before paying for it.",
          "zh": "令人振奋的故事，并不能替收益承诺作证。付款之前，读清条款，也核实来源。"
        },
        "quietAction": {
          "en": "Check one recurring cost against your actual use, and note what your budget needs to hold before adding anything new.",
          "zh": "核对一项固定费用是否真的用得上，在增加开支前，写清预算还需要承载什么。"
        }
      },
      "peer": {
        "mood": {
          "en": "Shared spending and comparison are highlighted this month. Your sense of enough may become clearer when it is separated from another person’s lifestyle.",
          "zh": "本月的财富意象落在共同开支与比较。把自己的足够感，从别人的生活方式里分出来，方向或更清楚。"
        },
        "action": {
          "en": "Set a comfortable limit for one social expense, and make shared costs explicit before agreeing to them.",
          "zh": "为一项社交开支设一个舒适上限，也在答应之前说清共同费用。"
        },
        "watch": {
          "en": "Belonging should not require spending past your capacity. Let your budget remain yours, even in good company.",
          "zh": "归属感不应以超出承受力的消费换取。即使相处愉快，预算也仍然属于你。"
        },
        "quietAction": {
          "en": "Look back at one shared expense and decide what a comfortable contribution would be next time.",
          "zh": "回看一项共同开支，先决定下次怎样的分担落在自己的舒适范围。"
        }
      },
      "expression": {
        "mood": {
          "en": "The month invites a closer look at how your skills become useful to others. Give the idea a practical form before attaching a money story to it.",
          "zh": "本月适合看看自己的能力如何为他人所用。先让想法有实际的形状，再为它安上金钱的故事。"
        },
        "action": {
          "en": "Outline one small offering and its costs, then gather real feedback before spending to expand it.",
          "zh": "写清一个小产品或服务及其成本，先收集真实反馈，再决定是否花钱扩大。"
        },
        "watch": {
          "en": "Excitement can make preparation feel like progress. Keep purchases tied to a clear need and a spending limit.",
          "zh": "兴奋有时会让购买准备看起来像进展。让每笔花费都对应明确需求与支出上限。"
        },
        "quietAction": {
          "en": "Write down the smallest useful version of an offering and check its costs before buying the tools around it.",
          "zh": "写清一个产品或服务最小的实用版本，先核对成本，再购买周边工具。"
        }
      },
      "structure": {
        "mood": {
          "en": "Commitments and limits are close to the surface. The opening lies in seeing what is already spoken for before inviting another obligation.",
          "zh": "已有的承诺与界限，或在本月更显眼。添一项新负担之前，先看清哪些资源已经有了去处。"
        },
        "action": {
          "en": "Review payment dates and recurring commitments, then choose one realistic adjustment to your spending plan.",
          "zh": "核对付款日期与固定负担，再为支出计划做一项现实可行的调整。"
        },
        "watch": {
          "en": "Scarcity can make urgency sound persuasive. Give pressured purchases a pause and verify the details.",
          "zh": "匮乏感有时会让催促显得格外有说服力。被催着消费时，留一点停顿，也核实细节。"
        },
        "quietAction": {
          "en": "Set aside a quiet moment to reconcile upcoming payments and remove one avoidable source of spending pressure.",
          "zh": "留一段安静时间核对即将到来的付款，移去一个可以避免的消费压力来源。"
        }
      },
      "stewardship": {
        "mood": {
          "en": "This month favors giving resources a deliberate place. A quiet act of organization may bring your intentions closer to what you can sustain.",
          "zh": "本月适合认真安排资源的位置。一次安静的整理，或能让心愿更靠近自己能够持续的生活。"
        },
        "action": {
          "en": "Assign available money to essentials, a buffer, and one meaningful goal, using amounts your circumstances allow.",
          "zh": "按自己的实际情况，把可用的钱分给必要开支、缓冲储备与一个有意义的目标。"
        },
        "watch": {
          "en": "A manifestation ritual cannot guarantee a return. Let any financial commitment rest on verified information and your capacity for loss.",
          "zh": "显化仪式无法保证回报。任何财务投入，都应落在核实的信息与自己的损失承受力之上。"
        },
        "quietAction": {
          "en": "Review how existing resources are allocated and make one adjustment that better matches a meaningful goal.",
          "zh": "回看现有资源的安排，做一项更贴近重要目标的调整。"
        }
      }
    }
  }
};
// Each relation has an outward (yang stem) and inward (yin stem) voice.
// Adjacent months can share an element while inviting different kinds of practice.
const monthlyVoices={
 health:{
  support:['A softer current returns','柔流回补','Rest gathers beneath the surface','静处蓄养','A quieter replenishing current gathers beneath this month. Give sleep and simple nourishment a little more room; renewal can begin before it becomes visible.','本月，滋养的细流藏在静处。为睡眠与简单的饮食多留一点位置，恢复有时先在看不见的地方开始。'],
  peer:['Find the rhythm that holds you','寻得稳稳节律','Keep your own gentle pace','守住自己的步调','Familiar rhythms become a quiet anchor. Keep the habit that leaves your body more settled, without borrowing another person’s pace or expectations.','熟悉的节律，是本月安静的锚。守住让身体安稳的习惯，不必借用别人的速度与期待。'],
  expression:['Let the breath move outward','让呼吸舒展开来','A smaller release goes deeper','轻轻舒展，向内松开','The invitation turns inward: a little stretching, a slower breath, a pause between demands. Choose release that leaves you with energy afterward.','这一月的邀请偏向内在：轻轻伸展、放慢呼吸，在消耗之间留一点空白。让舒展过后，自己仍有余量。'],
  structure:['Draw a circle around your rest','为休息画一道圈','Loosen the knot in your calendar','松开日程里的结','Pressure is easier to notice when the noise falls away. One obligation may need a gentler shape; let your limits protect the ordinary rhythms that sustain you.','喧闹退下，压力的轮廓更容易看见。一项责任或需要更柔和的形状，让边界守住滋养你的日常。'],
  stewardship:['Make a home for your energy','为精力安一处家','Let the roots hold','让根系稳稳托住','The current shifts from building a routine to keeping it alive. Tend the one practice that already steadies you; quiet consistency is the image of this month.','这一月的水流，从建立习惯转向守住习惯。照料那件已让你安稳的小事，细水长流是本月的意象。']
 },
 love:{
  support:['Make room to receive warmth','为温柔留一个位置','Let care find you quietly','让关心轻轻靠近','Warmth may be easier to recognize in ordinary gestures than in a grand sign. Let a real kindness reach you, while allowing affection to reveal itself at its own pace.','温柔或藏在普通的举动里，少一些盛大的征兆。接住真实的善意，让感情按自己的步调显露。'],
  peer:['Meet in the space between you','在彼此之间相遇','The mirror becomes quieter','把关系的镜面放静','The mirror of connection grows quieter this month. Notice whether closeness leaves room for your own voice; a mutual rhythm can be small and still meaningful.','这一月，关系的镜面渐静。留意靠近时自己的声音是否仍有位置，双向的节律可以很轻，也依然有分量。'],
  expression:['Give the unspoken a voice','给未说出的心意一个声音','A tender truth finds its words','让柔软的真话成形','A feeling is ready for a gentler language. Shape the words before sending them into the world; sincerity can be clear without asking for an immediate answer.','一种感受，正寻找更温柔的语言。先让话语成形，再递向对方；真诚可以清楚，也容得下回应的时间。'],
  structure:['Give affection a clear threshold','让感情有一道清楚的门槛','Untangle one quiet expectation','理开一份无声期待','An unspoken expectation may be weighing on the bond. Bring one thread into the light, gently and specifically, before trying to understand the entire knot.','未说出的期待，或让关系多了一点重量。先温和、具体地照亮一根线，再慢慢看整个结。'],
  stewardship:['Tend the bond in small ways','用细小心意照料关系','Let reciprocity take root','让相互回应慢慢扎根','This month turns toward what can be sustained between two people. Keep the gesture that is truly welcomed, and leave enough space for care to travel back to you.','这一月，重心转向两个人能持续守住的事。保留真正被欢迎的举动，也让关心有回到你身边的空间。']
 },
 family:{
  support:['Let the circle carry you','让家的圆圈托住你','Accept the smaller kindness','接住细小的好意','Care enters through practical details this month. A meal, a lift, a shared task: receiving something concrete can ease a burden without asking the whole family to change at once.','本月的关心，从实际的小事进入。一餐饭、一段接送、一次分担，接住具体的帮助，不必一次改变整个家庭。'],
  peer:['Meet beyond the old roles','在旧角色之外相见','A familiar room, a new listening','熟悉的房间，新的倾听','Shared history asks for slower listening. Meet a family member as they are today; one familiar ritual can hold a little more freedom than it used to.','共同的旧事，邀请更慢一点的倾听。按今天的样子与家人相处，一个熟悉的仪式也可以容下新的自由。'],
  expression:['Let a kinder word change the room','让温和的话改变屋里的风','Choose the one thread to name','先说清那一根线','Words have more room when they carry one need at a time. A short, thoughtful request can soften the atmosphere while letting old grievances stay outside this conversation.','一次只承载一个需要，话语才有余地。一份简短、认真斟酌的请求，或能让气氛松一些，把旧怨暂放在这次谈话之外。'],
  structure:['Bring the invisible duties to light','让看不见的责任走到明处','Set down the inherited weight','放下沿袭的重量','The month’s quieter image reveals what has been carried without discussion. Name one duty and a fairer share; care grows steadier when responsibility has a visible shape.','这一月的静处，照见未曾讨论的承担。说清一项责任与更公平的份额，关心有了清楚的形状，也更稳。'],
  stewardship:['Lay a calmer foundation at home','为家铺一层安稳','Keep one corner of home gentle','守住家里温和的一角','A gentler home begins with a detail that stays tended. Revisit one shared arrangement, let each person hold their part, and allow the atmosphere to settle without forcing harmony.','更温和的家，从一处被持续照料的小事开始。回看一项共同安排，让每个人守住自己的部分，气氛不必靠强求和谐来安顿。']
 },
 career:{
  support:['Prepare the door you want to enter','准备好想走进的那扇门','Strength grows behind the scenes','在幕后蓄一份力量','The current favors work done behind the scenes. Refine the evidence of your skill and listen for useful guidance; preparation gains value when it has a chosen destination.','本月的水流偏向幕后积累。打磨能力的证据，留意有用的指引；准备有了去处，才更有分量。'],
  peer:['Find the allies who see your work','找到看见你贡献的同伴','Give your contribution a clear name','让自己的贡献有名字','The quieter side of collaboration comes into view. Clarify where your contribution begins and ends; shared momentum feels more grounded when your place in it is visible.','合作较安静的一面，在本月浮现。理清自己的贡献从哪里开始、到哪里结束，让位置清楚，同行才更有落点。'],
  expression:['Let the work step into the light','让作品走到光里','Choose the room that can hear you','选一间听得见你的房间','Visibility takes a more selective shape this month. One thoughtful presentation to the right audience can honor your work better than scattering it everywhere at once.','这一月，被看见需要一点选择。一份对准合适对象的呈现，或比把作品散向各处更能承接你的努力。'],
  structure:['Turn pressure into a clear path','把压力整理成路径','Quietly redraw the scope','安静地重画范围','A hidden mismatch between expectation and capacity deserves attention. Review what is already promised, then make one precise adjustment before the pressure becomes your entire horizon.','期待与承载力之间的细小错位，值得留意。先看清已许下的承诺，再调整一处范围，不让压力占满整个视野。'],
  stewardship:['Choose the opportunity you can hold','选择自己接得住的机会','Let a promising path prove its shape','让可期的路显出形状','An opportunity needs space to reveal its practical shape. Examine the time, resources, and exchange it asks of you; a deliberate pause can be part of moving wisely.','一个机会，需要时间显露现实的形状。看看它要求的时间、资源与交换，有意识的停顿，也是前行的一部分。']
 },
 study:{
  support:['Let understanding find its roots','让理解找到根系','The missing step comes into focus','让缺失的那一步清晰','The month invites a return to the explanation you nearly understood. Patient attention to one missing step can make the surrounding knowledge feel less scattered.','这一月，适合回到那个差一点懂透的讲解。耐心补上缺失的一步，周围的知识也可能不再散乱。'],
  peer:['Learn in a shared rhythm','在共同节律里学习','Let another question deepen yours','让同伴的问题照深理解','A quieter exchange can deepen what you know. Prepare your own explanation, then listen for the question a study partner sees differently; your progress need not match their speed.','一次安静的交流，可以把理解往深处带。先准备自己的讲解，再听同伴从不同角度提出的问题，进度不必同速。'],
  expression:['Put what you know into motion','让所学流动起来','A small attempt reveals the edge','用一次小尝试看见边缘','The current turns toward a private trial of what you have learned. Attempt a small task without the notes, then follow the point where your reasoning loses its thread.','这一月的水流，偏向独自检验所学。合上笔记做一次小练习，顺着推理断开的地方，找到下一处需要补足的边缘。'],
  structure:['Give the deadline a steady rhythm','给期限一段稳稳的节律','Let the essentials come first','先让必要之事落定','The quiet task is selection. Separate what the deadline truly requires from what merely looks impressive; a smaller plan may hold your attention more faithfully.','这一月的静功，是选择。把期限真正需要的，与只是看起来漂亮的分开；小一些的计划，或更能守住专注。'],
  stewardship:['Choose the knowledge worth tending','选值得照料的学问','Return to the lesson beneath the mistake','回到错误底下的那一课','Depth comes through returning, not adding. Revisit a recent mistake and the skill underneath it; this month’s image is a root strengthened before another branch grows.','深处，来自回返。重看最近的错误与它下面的基础能力，本月的意象是先固一条根，再生一段枝。']
 },
 wealth:{
  support:['Give abundance a steadier foundation','为丰盛铺稳基础','Let the numbers become clear','让数字渐渐清楚','The quieter current favors clarity about what you already have. Check the costs that repeat and the reserves that remain; knowing enough gives your next intention a firmer ground.','这一月的静流，偏向看清已有的资源。核对反复的开支与尚存的储备，知道自己的足够，让下一个心愿更有落点。'],
  peer:['Keep your own measure of enough','守住自己的足够感','Step back from the borrowed horizon','从借来的标准里退一步','Comparison loses some of its pull when you return to your own circumstances. Review a shared expense and choose a contribution that lets connection and capacity coexist.','回到自己的实际处境，比较的牵引会轻一些。回看一笔共同开支，让分担既容纳联结，也守住承受力。'],
  expression:['Give your idea a useful shape','给想法一个有用的形状','Test the seed before expanding','先试一粒种，再谈铺开','A smaller test is the image of this month. Let an idea meet real feedback and its actual costs before surrounding it with purchases; usefulness grows through contact with reality.','本月的意象，是一次小试。让想法先遇见真实反馈与实际成本，再添置工具；有用的价值，在接触现实中生长。'],
  structure:['Make space between money and urgency','在金钱与催促之间留白','Bring the commitments into balance','让已有承诺归于平衡','The quieter work is reconciling what is already promised. Give upcoming payments a clear place and remove one avoidable pressure, so the next decision has room to breathe.','这一月的静功，是理顺已许下的承诺。安顿即将到来的付款，移去一个可避免的压力，让下一次选择有呼吸的余地。'],
  stewardship:['Let each resource serve an intention','让每份资源有一处心愿','Tend what is already in your hands','照料已经握在手里的资源','This month turns from acquiring toward tending. Revisit where existing resources go, and bring one allocation closer to a goal that matters; the symbol is quiet order, not a promised return.','这一月，从获取转向照料。回看已有资源的去处，让一处安排更靠近重要目标；意象是安静的秩序，并非收益的许诺。']
 }
};
for(const [topicKey,voices] of Object.entries(monthlyVoices)){
 for(const [relation,voice] of Object.entries(voices)){
  Object.assign(topics[topicKey].relations[relation],{
   title:{en:voice[0],zh:voice[1]},
   quietTitle:{en:voice[2],zh:voice[3]},
   quietMood:{en:voice[4],zh:voice[5]}
  });
 }
}
root.MingTopics=topics;
if(typeof module!=="undefined")module.exports=topics;
})(typeof window!=="undefined"?window:globalThis);
