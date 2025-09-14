declare const DeleteApiV3AccountsUsernameTrackerTweet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsTrackerTweet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly createdAt: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly description: "The date and time when indexing was initiated";
                                readonly examples: readonly [1742283266];
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startDate: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly description: "During indexing, only tweets created after this date are downloaded.";
                                readonly examples: readonly [1742265254];
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly twitterUserId: {
                                readonly type: "string";
                                readonly examples: readonly ["1026753750038470658"];
                            };
                        };
                        readonly required: readonly ["createdAt", "twitterUserId"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameFeedEvents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly fromDate: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: any;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unixtimestamp of the earliest event to include.";
                };
                readonly toDate: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: any;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unixtimestamp of the most recent event to include.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of items to return";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly createdAt: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly description: "The date the event was created";
                                readonly examples: readonly [1737729427];
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["NEW_BIO", "NEW_FOLLOWING", "NEW_FOLLOWING_BY_SMART", "NEW_UNFOLLOWING_BY_SMART", "NEW_MAJOR_EVENT"];
                                readonly description: "`NEW_BIO` `NEW_FOLLOWING` `NEW_FOLLOWING_BY_SMART` `NEW_UNFOLLOWING_BY_SMART` `NEW_MAJOR_EVENT`";
                            };
                            readonly data: {};
                        };
                        readonly required: readonly ["createdAt", "data", "type"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameFeedSmartMentions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly fromDate: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: any;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unixtimestamp of the earliest event to include.";
                };
                readonly toDate: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: any;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unixtimestamp of the most recent event to include.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of items to return";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly createdAt: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly description: "The date the event was created";
                                readonly examples: readonly [1737729427];
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["NEW_MENTION"];
                                readonly examples: readonly ["NEW_MENTION"];
                                readonly description: "`NEW_MENTION`";
                            };
                            readonly data: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly mentionBy: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly userId: {
                                                readonly type: "string";
                                            };
                                            readonly userUrl: {
                                                readonly type: "string";
                                            };
                                            readonly moniScore: {
                                                readonly type: "integer";
                                                readonly format: "int32";
                                                readonly minimum: -2147483648;
                                                readonly maximum: 2147483647;
                                            };
                                            readonly smartsCount: {
                                                readonly type: "integer";
                                                readonly format: "int32";
                                                readonly minimum: -2147483648;
                                                readonly maximum: 2147483647;
                                            };
                                            readonly tags: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly slug: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["influencer"];
                                                        };
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["Influencer"];
                                                        };
                                                    };
                                                    readonly required: readonly ["name", "slug"];
                                                };
                                            };
                                        };
                                        readonly required: readonly ["userId", "userUrl"];
                                    };
                                    readonly postUrl: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://x.com/elonmusk/status/1900638690252136809"];
                                    };
                                    readonly postId: {
                                        readonly type: "string";
                                        readonly examples: readonly ["1900638690252136809"];
                                    };
                                };
                                readonly required: readonly ["mentionBy", "postId", "postUrl"];
                            };
                        };
                        readonly required: readonly ["createdAt", "data", "type"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameFeedTweetsFull: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly fromTweetId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "PostId of the earliest event to include.";
                };
                readonly toTweetId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "PostId of the most recent event to include.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of items to return";
                };
                readonly types: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The types of events to return separated by comma. Available values: `NEW_POST`, `NEW_RETWEET`, `NEW_REPLY`. If not specified, it will return records of all event types.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly data: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly engagement: {
                                        readonly description: "The tweet engagement";
                                        readonly type: "object";
                                        readonly required: readonly ["postScore"];
                                        readonly properties: {
                                            readonly postScore: {
                                                readonly type: "number";
                                                readonly format: "float";
                                                readonly description: "The post score";
                                                readonly examples: readonly [91.6];
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                        };
                                    };
                                    readonly meta: {
                                        readonly description: "The tweet meta";
                                        readonly type: "object";
                                        readonly required: readonly ["postId"];
                                        readonly properties: {
                                            readonly postId: {
                                                readonly type: "number";
                                                readonly description: "Indicates the unique identifier of the tweet";
                                                readonly examples: readonly ["1901917025385005306"];
                                            };
                                        };
                                    };
                                };
                                readonly required: readonly ["engagement", "meta"];
                            };
                        };
                        readonly required: readonly ["data"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameHistoryMentionsCount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Timeframe";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly chart: {
                    readonly type: "array";
                    readonly description: "List of [Timestamp (UNIX) representing the date, Historical value on this date]";
                    readonly items: {};
                };
                readonly timeframeChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value over the specified timeframe";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFoundChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value since the account was first identified";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFound: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Value at the time the account was first discovered";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameHistorySmartMentionsCount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Timeframe";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly chart: {
                    readonly type: "array";
                    readonly description: "List of [Timestamp (UNIX) representing the date, Historical value on this date]";
                    readonly items: {};
                };
                readonly timeframeChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value over the specified timeframe";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFoundChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value since the account was first identified";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFound: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Value at the time the account was first discovered";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameHistorySmartsCount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Timeframe";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly chart: {
                    readonly type: "array";
                    readonly description: "List of [Timestamp (UNIX) representing the date, Historical value on this date]";
                    readonly items: {};
                };
                readonly timeframeChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value over the specified timeframe";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFoundChange: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Change in value since the account was first identified";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly sinceFound: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Value at the time the account was first discovered";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameInfoFull: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly userId: {
                            readonly type: "string";
                            readonly description: "Internal ID of the account in [x.com](https://x.com/)";
                            readonly examples: readonly ["1026753750038470658"];
                        };
                        readonly userUrl: {
                            readonly type: "string";
                            readonly description: "URL of the account in [x.com](https://x.com/)";
                            readonly examples: readonly ["https://x.com/elonmusk"];
                        };
                    };
                    readonly required: readonly ["userId", "userUrl"];
                };
                readonly smartEngagement: {
                    readonly type: "object";
                    readonly properties: {
                        readonly smartsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of smarts of the account in [x.com](https://x.com/)";
                            readonly examples: readonly [494];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly moniScore: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Account score based on its smarts in [x.com](https://x.com/)";
                            readonly examples: readonly [3718];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly mentionsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Total number of mentions of the account in [x.com](https://x.com/)";
                            readonly examples: readonly [2779];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly smartMentionsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of mentions by \"smart\" accounts in [x.com](https://x.com/)";
                            readonly examples: readonly [1761];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly required: readonly ["mentionsCount", "moniScore", "smartMentionsCount", "smartsCount"];
                };
                readonly smartProfile: {
                    readonly type: "object";
                    readonly properties: {
                        readonly smartTier: {
                            readonly description: "Tier of the smarts";
                            readonly type: "object";
                            readonly properties: {
                                readonly tier: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly description: "Tiers range from 1 (highest) to 3 (lowest)";
                                    readonly examples: readonly [1];
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly logoUrl: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/score_1.png"];
                                };
                            };
                        };
                        readonly smartTags: {
                            readonly type: "array";
                            readonly description: "List of tags manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly smartTagCategories: {
                            readonly type: "array";
                            readonly description: "List of tag categories manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly projectTags: {
                            readonly type: "array";
                            readonly description: "Tags associated with the account, manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly chains: {
                            readonly type: "array";
                            readonly description: "Blockchain networks the account is associated with";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ethereum"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Ethereum"];
                                    };
                                };
                                readonly required: readonly ["name", "slug"];
                            };
                        };
                        readonly bioChangesCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Indicates the number of times the user's bio has been changed.";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly required: readonly ["bioChangesCount"];
                };
            };
            readonly required: readonly ["meta", "smartEngagement", "smartProfile"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameInfoMeta: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly userId: {
                            readonly type: "string";
                            readonly description: "Internal ID of the account in [x.com](https://x.com/)";
                            readonly examples: readonly ["1026753750038470658"];
                        };
                        readonly userUrl: {
                            readonly type: "string";
                            readonly description: "URL of the account in [x.com](https://x.com/)";
                            readonly examples: readonly ["https://x.com/elonmusk"];
                        };
                    };
                    readonly required: readonly ["userId", "userUrl"];
                };
            };
            readonly required: readonly ["meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameInfoSmartEngagement: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly smartEngagement: {
                    readonly type: "object";
                    readonly properties: {
                        readonly smartsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of smarts of the account in [x.com](https://x.com/)";
                            readonly examples: readonly [494];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly moniScore: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Account score based on its smarts in [x.com](https://x.com/)";
                            readonly examples: readonly [3718];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly mentionsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Total number of mentions of the account in [x.com](https://x.com/)";
                            readonly examples: readonly [2779];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly smartMentionsCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of mentions by \"smart\" accounts in [x.com](https://x.com/)";
                            readonly examples: readonly [1761];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly required: readonly ["mentionsCount", "moniScore", "smartMentionsCount", "smartsCount"];
                };
            };
            readonly required: readonly ["smartEngagement"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameInfoSmartProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly smartProfile: {
                    readonly type: "object";
                    readonly properties: {
                        readonly smartTier: {
                            readonly description: "Tier of the smarts";
                            readonly type: "object";
                            readonly properties: {
                                readonly tier: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly description: "Tiers range from 1 (highest) to 3 (lowest)";
                                    readonly examples: readonly [1];
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly logoUrl: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/score_1.png"];
                                };
                            };
                        };
                        readonly smartTags: {
                            readonly type: "array";
                            readonly description: "List of tags manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly smartTagCategories: {
                            readonly type: "array";
                            readonly description: "List of tag categories manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly projectTags: {
                            readonly type: "array";
                            readonly description: "Tags associated with the account, manually assigned by moderators";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["alpha-hunter"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Alpha Hunter"];
                                    };
                                    readonly totalCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly examples: readonly [3];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["name", "slug", "totalCount"];
                            };
                        };
                        readonly chains: {
                            readonly type: "array";
                            readonly description: "Blockchain networks the account is associated with";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly slug: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ethereum"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Ethereum"];
                                    };
                                };
                                readonly required: readonly ["name", "slug"];
                            };
                        };
                        readonly bioChangesCount: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Indicates the number of times the user's bio has been changed.";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly required: readonly ["bioChangesCount"];
                };
            };
            readonly required: readonly ["smartProfile"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smarts categories";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly slug: {
                                readonly type: "string";
                                readonly description: "Slug of the category";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the category";
                            };
                            readonly itemsCount: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly description: "Number of smarts in this category";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly required: readonly ["itemsCount", "name", "slug"];
                    };
                };
                readonly totalCount: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The total number of Smarts categories";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["items", "totalCount"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsDistributionLevel: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smart Followers levels";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly level: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly itemsCount: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsFull: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first smarts to return";
                };
                readonly orderBy: {
                    readonly type: "string";
                    readonly enum: readonly ["CREATED_AT", "SCORE", "FOLLOWERS_COUNT", "SMARTS_COUNT"];
                    readonly default: "CREATED_AT";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines the sorting criteria for smarts. Supported values: `CREATED_AT` Sort by the date the smart was added; `SCORE` Sort by the moni score on discover.getmoni.io.; `FOLLOWERS_COUNT` Sort by the total number of followers. `SMARTS_COUNT` Sort by the number of smarts.";
                };
                readonly orderByDirection: {
                    readonly type: "string";
                    readonly enum: readonly ["ASC", "DESC"];
                    readonly default: "DESC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sorting direction for orderBy. Supported values: `DESC` means descending order; `ASC` means ascending order";
                };
                readonly categories: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filters \"smart\" by the specified categories. Categories should be provided as a comma-separated list. A full list of available categories can be retrieved via `/api/v3/accounts/{username}/smarts/categories/`";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smarts";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly meta: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly userId: {
                                        readonly type: "number";
                                        readonly description: "Internal ID of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly ["14379660"];
                                    };
                                    readonly userUrl: {
                                        readonly type: "string";
                                        readonly description: "URL of the account in [x.com](https://x.com/)";
                                        readonly examples: readonly ["https://x.com/elonmusk"];
                                    };
                                };
                                readonly required: readonly ["userUrl"];
                            };
                            readonly smartEngagement: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly interactedAt: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Date and time the smart was added";
                                        readonly examples: readonly [1708135452];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly moniScore: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Account score based on its smarts in [x.com](https://x.com/)";
                                        readonly examples: readonly [25147];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly mentionsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Total number of mentions of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly [6313];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly smartMentionsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Total number of mentions from \"smart\" accounts on [x.com](http://x.com/)";
                                        readonly examples: readonly [4744];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly smartsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Number of smarts of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly [2396];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["mentionsCount", "moniScore", "smartMentionsCount", "smartsCount"];
                            };
                            readonly smartProfile: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly smartTier: {
                                        readonly description: "Tier of the smart";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly tier: {
                                                readonly type: "integer";
                                                readonly format: "int32";
                                                readonly description: "Tiers range from 1 (highest) to 3 (lowest)";
                                                readonly examples: readonly [1];
                                                readonly minimum: -2147483648;
                                                readonly maximum: 2147483647;
                                            };
                                            readonly logoUrl: {
                                                readonly type: "string";
                                                readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/score_1.png"];
                                            };
                                        };
                                    };
                                    readonly smartTags: {
                                        readonly type: "array";
                                        readonly description: "List of tags manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly smartTagCategories: {
                                        readonly type: "array";
                                        readonly description: "List of tag categories manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly projectTags: {
                                        readonly type: "array";
                                        readonly description: "Tags associated with the account, manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly chains: {
                                        readonly type: "array";
                                        readonly description: "Blockchain networks the account is associated with";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ethereum"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Ethereum"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly bioChangesCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Indicates the number of times the user's bio has been changed.";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["bioChangesCount"];
                            };
                        };
                        readonly required: readonly ["meta", "smartEngagement", "smartProfile"];
                    };
                };
                readonly totalCount: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The total number of Smarts";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["items", "totalCount"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsMeta: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first smarts to return";
                };
                readonly orderBy: {
                    readonly type: "string";
                    readonly enum: readonly ["CREATED_AT", "SCORE", "FOLLOWERS_COUNT", "SMARTS_COUNT"];
                    readonly default: "CREATED_AT";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines the sorting criteria for smarts. Supported values: `CREATED_AT` Sort by the date the smart was added; `SCORE` Sort by the moni score on discover.getmoni.io.; `FOLLOWERS_COUNT` Sort by the total number of followers. `SMARTS_COUNT` Sort by the number of smarts.";
                };
                readonly orderByDirection: {
                    readonly type: "string";
                    readonly enum: readonly ["ASC", "DESC"];
                    readonly default: "DESC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sorting direction for orderBy. Supported values: `DESC` means descending order; `ASC` means ascending order";
                };
                readonly categories: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filters \"smart\" by the specified categories. Categories should be provided as a comma-separated list. A full list of available categories can be retrieved via `/api/v3/accounts/{username}/smarts/categories/`";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smarts";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly meta: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly userId: {
                                        readonly type: "number";
                                        readonly description: "Internal ID of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly ["14379660"];
                                    };
                                    readonly userUrl: {
                                        readonly type: "string";
                                        readonly description: "URL of the account in [x.com](https://x.com/)";
                                        readonly examples: readonly ["https://x.com/elonmusk"];
                                    };
                                };
                                readonly required: readonly ["userUrl"];
                            };
                        };
                        readonly required: readonly ["meta"];
                    };
                };
                readonly totalCount: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The total number of Smarts";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["items", "totalCount"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsSmartEngagement: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first smarts to return";
                };
                readonly orderBy: {
                    readonly type: "string";
                    readonly enum: readonly ["CREATED_AT", "SCORE", "FOLLOWERS_COUNT", "SMARTS_COUNT"];
                    readonly default: "CREATED_AT";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines the sorting criteria for smarts. Supported values: `CREATED_AT` Sort by the date the smart was added; `SCORE` Sort by the moni score on discover.getmoni.io.; `FOLLOWERS_COUNT` Sort by the total number of followers. `SMARTS_COUNT` Sort by the number of smarts.";
                };
                readonly orderByDirection: {
                    readonly type: "string";
                    readonly enum: readonly ["ASC", "DESC"];
                    readonly default: "DESC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sorting direction for orderBy. Supported values: `DESC` means descending order; `ASC` means ascending order";
                };
                readonly categories: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filters \"smart\" by the specified categories. Categories should be provided as a comma-separated list. A full list of available categories can be retrieved via `/api/v3/accounts/{username}/smarts/categories/`";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smarts";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly smartEngagement: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly interactedAt: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Date and time the smart was added";
                                        readonly examples: readonly [1708135452];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly moniScore: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Account score based on its smarts in [x.com](https://x.com/)";
                                        readonly examples: readonly [25147];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly mentionsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Total number of mentions of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly [6313];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly smartMentionsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Total number of mentions from \"smart\" accounts on [x.com](http://x.com/)";
                                        readonly examples: readonly [4744];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly smartsCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Number of smarts of the account on [x.com](http://x.com/)";
                                        readonly examples: readonly [2396];
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["mentionsCount", "moniScore", "smartMentionsCount", "smartsCount"];
                            };
                        };
                        readonly required: readonly ["smartEngagement"];
                    };
                };
                readonly totalCount: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The total number of Smarts";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["items", "totalCount"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AccountsUsernameSmartsSmartProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first smarts to return";
                };
                readonly orderBy: {
                    readonly type: "string";
                    readonly enum: readonly ["CREATED_AT", "SCORE", "FOLLOWERS_COUNT", "SMARTS_COUNT"];
                    readonly default: "CREATED_AT";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines the sorting criteria for smarts. Supported values: `CREATED_AT` Sort by the date the smart was added; `SCORE` Sort by the moni score on discover.getmoni.io.; `FOLLOWERS_COUNT` Sort by the total number of followers. `SMARTS_COUNT` Sort by the number of smarts.";
                };
                readonly orderByDirection: {
                    readonly type: "string";
                    readonly enum: readonly ["ASC", "DESC"];
                    readonly default: "DESC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sorting direction for orderBy. Supported values: `DESC` means descending order; `ASC` means ascending order";
                };
                readonly categories: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filters \"smart\" by the specified categories. Categories should be provided as a comma-separated list. A full list of available categories can be retrieved via `/api/v3/accounts/{username}/smarts/categories/`";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly description: "The list of Smarts";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly smartProfile: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly smartTier: {
                                        readonly description: "Tier of the smart";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly tier: {
                                                readonly type: "integer";
                                                readonly format: "int32";
                                                readonly description: "Tiers range from 1 (highest) to 3 (lowest)";
                                                readonly examples: readonly [1];
                                                readonly minimum: -2147483648;
                                                readonly maximum: 2147483647;
                                            };
                                            readonly logoUrl: {
                                                readonly type: "string";
                                                readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/score_1.png"];
                                            };
                                        };
                                    };
                                    readonly smartTags: {
                                        readonly type: "array";
                                        readonly description: "List of tags manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly smartTagCategories: {
                                        readonly type: "array";
                                        readonly description: "List of tag categories manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly projectTags: {
                                        readonly type: "array";
                                        readonly description: "Tags associated with the account, manually assigned by moderators";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["influencer"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Influencer"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly chains: {
                                        readonly type: "array";
                                        readonly description: "Blockchain networks the account is associated with";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ethereum"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Ethereum"];
                                                };
                                            };
                                            readonly required: readonly ["name", "slug"];
                                        };
                                    };
                                    readonly bioChangesCount: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Indicates the number of times the user's bio has been changed.";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["bioChangesCount"];
                            };
                        };
                        readonly required: readonly ["smartProfile"];
                    };
                };
                readonly totalCount: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The total number of Smarts";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["items", "totalCount"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AnalyticsChartsMindshareCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly forAccountProjectChains: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Chains listed comma-separated slugs from `/api/v3/basics/project_chains/`. It will return mindshare only for projects with the specified chains.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 20;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first project to return";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe for which to show changes in values.";
                };
                readonly fromSmartAccountsTagCategories: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Smart tag categories listed comma-separated slugs from `/api/v3/basics/smart_tag_categories/`. It will return mindshare calculated only from the specified smart categories.";
                };
            };
            readonly required: readonly ["limit", "offset"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the category";
                                readonly examples: readonly ["AI"];
                            };
                            readonly logoUrl: {
                                readonly type: "string";
                                readonly format: "url";
                                readonly description: "Link to the category’s logo";
                                readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/project_tag_logo/ai.png"];
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The value in percent. It represents the ratio of smart mentions for this category to the total number of smart mentions.";
                                readonly examples: readonly [50.4];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly change: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "Represents the ratio of the current mindshare to the mindshare from the previous identical timeframe.";
                                readonly examples: readonly [-12.5];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                        readonly required: readonly ["change", "logoUrl", "name", "value"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AnalyticsChartsMindshareChains: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly forAccountProjectTags: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Tags listed comma-separated slugs from `/api/v3/basics/project_categories/`. It will return mindshare only from projects with the specified tags.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 20;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first project to return";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe for which to show changes in values.";
                };
                readonly fromSmartAccountsTagCategories: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Smart tag categories listed comma-separated slugs from `/api/v3/basics/smart_tag_categories/`. It will return mindshare calculated only from the specified smart categories.";
                };
            };
            readonly required: readonly ["limit", "offset"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the category";
                                readonly examples: readonly ["AI"];
                            };
                            readonly logoUrl: {
                                readonly type: "string";
                                readonly format: "url";
                                readonly description: "Link to the category’s logo";
                                readonly examples: readonly ["https://storage.googleapis.com/moni-twitter-bot/statics/images/project_tag_logo/ai.png"];
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The value in percent. It represents the ratio of smart mentions for this category to the total number of smart mentions.";
                                readonly examples: readonly [50.4];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly change: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "Represents the ratio of the current mindshare to the mindshare from the previous identical timeframe.";
                                readonly examples: readonly [-12.5];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                        readonly required: readonly ["change", "logoUrl", "name", "value"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3AnalyticsChartsMindshareProjects: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly forAccountProjectChains: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Chains listed comma-separated slugs from `/api/v3/basics/project_chains/`. It will return mindshare only for projects with the specified chains.";
                };
                readonly forAccountProjectTags: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Tags listed comma-separated slugs from `/api/v3/basics/project_categories/`. It will return mindshare only from projects with the specified tags.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: 1;
                    readonly maximum: 20;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of items to return in a single request";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The starting index of the first project to return";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly enum: readonly ["H1", "H24", "D7", "D30", "D90", "D180", "Y1"];
                    readonly default: "H24";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe for which to show changes in values.";
                };
                readonly fromSmartAccountsTagCategories: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Smart tag categories listed comma-separated slugs from `/api/v3/basics/smart_tag_categories/`. It will return mindshare calculated only from the specified smart categories.";
                };
                readonly forAccounts: {
                    readonly type: "string";
                    readonly default: any;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Account handles to get mindshare for. It will return mindshare according to the specified parameters, but the mindshare for the given accounts will be added at the beginning of the list.";
                };
            };
            readonly required: readonly ["limit", "offset"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userId: {
                                readonly type: "string";
                                readonly description: "Internal ID of the account in [x.com](https://x.com/)";
                                readonly examples: readonly ["1026753750038470658"];
                            };
                            readonly projectTags: {
                                readonly type: "array";
                                readonly description: "Tags associated with the account, manually assigned by moderators";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Alpha Hunter"];
                                        };
                                        readonly logoUrl: {
                                            readonly type: "string";
                                            readonly format: "url";
                                        };
                                    };
                                    readonly required: readonly ["logoUrl", "name"];
                                };
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The value in percent. It represents the ratio of smart mentions for this account to the total number of smart mentions.";
                                readonly examples: readonly [50.4];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly change: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "Represents the ratio of the current mindshare to the mindshare from the previous identical timeframe.";
                                readonly examples: readonly [-12.5];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                        readonly required: readonly ["change", "projectTags", "userId", "value"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3BasicsProjectCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly slug: {
                                readonly type: "string";
                                readonly examples: readonly ["ai"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["AI"];
                            };
                        };
                        readonly required: readonly ["name", "slug"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3BasicsProjectChains: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly slug: {
                                readonly type: "string";
                                readonly examples: readonly ["ethereum"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Ethereum"];
                            };
                        };
                        readonly required: readonly ["name", "slug"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3BasicsSmartTagCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly slug: {
                                readonly type: "string";
                                readonly examples: readonly ["influencers"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Influencers"];
                            };
                        };
                        readonly required: readonly ["name", "slug"];
                    };
                };
            };
            readonly required: readonly ["items"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3StatusApiKey: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly isActive: {
                    readonly type: "boolean";
                    readonly description: "Indicates whether the API key is active";
                };
                readonly monthPointsLimit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The monthly points limit for the API key";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly monthPointsUsage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The number of points made with the API key in the current month";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly expiresAt: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly description: "The expiration unixtimestamp of the API key";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly required: readonly ["expiresAt", "isActive", "monthPointsLimit", "monthPointsUsage"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV3StatusServer: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV3AccountsUsernameTrackerTweet: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly startDate: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: any;
                readonly description: "If you send this parameter, credits will only be deducted for tweets created after this date";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The username (handle) of the user in x.com";
                };
            };
            readonly required: readonly ["username"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Api-Key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Api-Key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteApiV3AccountsUsernameTrackerTweet, GetApiV3AccountsTrackerTweet, GetApiV3AccountsUsernameFeedEvents, GetApiV3AccountsUsernameFeedSmartMentions, GetApiV3AccountsUsernameFeedTweetsFull, GetApiV3AccountsUsernameHistoryMentionsCount, GetApiV3AccountsUsernameHistorySmartMentionsCount, GetApiV3AccountsUsernameHistorySmartsCount, GetApiV3AccountsUsernameInfoFull, GetApiV3AccountsUsernameInfoMeta, GetApiV3AccountsUsernameInfoSmartEngagement, GetApiV3AccountsUsernameInfoSmartProfile, GetApiV3AccountsUsernameSmartsCategories, GetApiV3AccountsUsernameSmartsDistributionLevel, GetApiV3AccountsUsernameSmartsFull, GetApiV3AccountsUsernameSmartsMeta, GetApiV3AccountsUsernameSmartsSmartEngagement, GetApiV3AccountsUsernameSmartsSmartProfile, GetApiV3AnalyticsChartsMindshareCategories, GetApiV3AnalyticsChartsMindshareChains, GetApiV3AnalyticsChartsMindshareProjects, GetApiV3BasicsProjectCategories, GetApiV3BasicsProjectChains, GetApiV3BasicsSmartTagCategories, GetApiV3StatusApiKey, GetApiV3StatusServer, PutApiV3AccountsUsernameTrackerTweet };
