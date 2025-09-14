"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'moni-discover-api/v1 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * **Description**: Provides project mindshare analytics.
     *
     *
     *
     * **Usage**: Use this endpoint to understand which projects are most discussed by smarts
     * within the selected timeframe.
     *
     *
     * Use `api/v3/basics/project_categories/` to get all available project categories
     * Use `api/v3/basics/project_chains/` to get all available project chains.
     * Use `api/v3/basics/smart_tag_categories/` to get all available smart tag categories.
     *
     *
     *
     * **Usage Cost**: 1 point per project + 50 points per project in the forAccounts parameter
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Projects Mindshare
     */
    SDK.prototype.getApiV3AnalyticsChartsMindshareProjects = function (metadata) {
        return this.core.fetch('/api/v3/analytics/charts/mindshare/projects/', 'get', metadata);
    };
    /**
     * **Description**: Provides category mindshare analytics.
     *
     *
     *
     * **Usage**: Use this endpoint to understand which narratives are most discussed by smart
     * money within the selected timeframe.
     *
     *
     * Use `api/v3/basics/project_categories/` to get all available project categories
     * Use `api/v3/basics/project_chains/` to get all available project chains.
     * Use `api/v3/basics/smart_tag_categories/` to get all available smart tag categories.
     *
     *
     *
     * **Usage Cost**: 1 points per category
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Category Mindshare
     */
    SDK.prototype.getApiV3AnalyticsChartsMindshareCategories = function (metadata) {
        return this.core.fetch('/api/v3/analytics/charts/mindshare/categories/', 'get', metadata);
    };
    /**
     * **Description**: Provides chain mindshare analytics.
     *
     *
     *
     * **Usage**: Use this endpoint to understand which chains are most discussed by smart
     * money within the selected timeframe.
     *
     *
     * Use `api/v3/basics/project_categories/` to get all available project categories
     * Use `api/v3/basics/project_chains/` to get all available project chains.
     * Use `api/v3/basics/smart_tag_categories/` to get all available smart tag categories.
     *
     *
     *
     * **Usage Cost**: 1 points per chain
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Chains Mindshare
     */
    SDK.prototype.getApiV3AnalyticsChartsMindshareChains = function (metadata) {
        return this.core.fetch('/api/v3/analytics/charts/mindshare/chains/', 'get', metadata);
    };
    /**
     * **Description**: Provides all available project categories
     *
     *
     *
     * **Usage**: Use this endpoint to get the full list of project categories.
     *
     *
     *
     * **Usage Cost**: 0 point
     *
     * @summary Categories for Mindshare
     */
    SDK.prototype.getApiV3BasicsProject_categories = function (metadata) {
        return this.core.fetch('/api/v3/basics/project_categories/', 'get', metadata);
    };
    /**
     * **Description**: Provides all available project chains
     *
     *
     *
     * **Usage**: Use this endpoint to get the full list of chains.
     *
     *
     *
     * **Usage Cost**: 0 point
     *
     * @summary Chains for Mindshare
     */
    SDK.prototype.getApiV3BasicsProject_chains = function (metadata) {
        return this.core.fetch('/api/v3/basics/project_chains/', 'get', metadata);
    };
    /**
     * **Description**: Provides all available smart tag categories
     *
     *
     *
     * **Usage**: Use this endpoint to get the full list of smart categories.
     *
     *
     *
     * **Usage Cost**: 0 point
     *
     * @summary Smarts for Mindshare
     */
    SDK.prototype.getApiV3BasicsSmart_tag_categories = function (metadata) {
        return this.core.fetch('/api/v3/basics/smart_tag_categories/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **detailed insights** about a specific account using its
     * username.
     *
     * The response includes:
     *
     *   -  **Profile metadata** – ID.
     *
     *   -  **Engagement metrics** – smarts count, tweet count, mentions.
     *
     *   -  **Advanced analytics** – number of Smarts, Smart Mentions and **Moni score**.
     *
     *   -  **Blockchain & category tagging** – identifies the account’s connection to specific
     * blockchains and assigns tags from algorithm or manual classification by moderators &
     * tiers **(tier from 1 to 3)** smart is tagged and assigned by algorithm & moderators
     *
     * Use this endpoint to analyze **influencers, projects, and community engagement** in
     * Web3.
     *
     *
     *
     * **Usage**: Use to extract full information of any specific account including Moni Score
     * & Social Analytics. Get deep insights into any specific account.
     *
     *
     *
     * **Usage Cost**: 8 points per request
     *
     * @summary Full Account Info
     */
    SDK.prototype.getApiV3AccountsUsernameInfoFull = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/info/full/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **basic profile data** of a specific account using its
     * username.
     *
     * The response includes:
     *
     *   -  **Profile details** – ID.
     *
     * This endpoint provides **only account ID** without advanced social analytics.
     *
     *
     *
     * **Usage**: Use to fetch account ID.
     *
     *
     *
     * **Usage Cost**: 1 points per request
     *
     * @summary Account Metadata (ID)
     */
    SDK.prototype.getApiV3AccountsUsernameInfoMeta = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/info/meta/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves only **advanced insights** about a specific account,
     * including:
     *
     *  -  **Smart profile analysis** – internal ranking called **Smart Tier** of account
     * influence.
     *
     *  -  **Categorization & tags** – labels assigned algorithmically or manually from our
     * moderators.
     *
     *  -  **Blockchain affiliation** – blockchains associated with the account.
     *
     *  -  **Profile history** – number of bio updates as a signal of behavioral patterns.
     *
     * **Smart Tier** - is a rank assigned by Moni internal algorithm. There are three tiers
     * based on the "smart" account's rating tiers:
     *
     * 1 - 🧠
     *
     * 2 - 🧠🧠
     *
     * 3 - 🧠🧠🧠
     *
     * The higher the tier, the greater the account's influence on its audience.
     *
     *
     *
     * **Usage**: Use to access an account’s influence & smart audience presence, detect
     * blockchain-linked accounts in the crypto space, categorize profiles based on
     * moderator-assigned tags & tiers.
     *
     *
     *
     * **Usage Cost**: 2 points per request
     *
     * @summary Account Smart Profile
     */
    SDK.prototype.getApiV3AccountsUsernameInfoSmart_profile = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/info/smart_profile/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **only advanced engagement analytics** for a specific
     * account, including:
     *
     *   -  **Smarts count** – how many smarts interacted with this account.
     *
     *   -  **Moni score** – our internal account score calculated based on smarts.
     *
     *   -  **Total mentions** – number of times the account was mentioned.
     *
     *   -  **Smart mentions** – how often it's mentioned by "smart" accounts.
     *
     *
     *
     * **Usage**: Use this endpoint to analyze an account’s impact, influence, and reach within
     * the smart Web3 community. Identify influential Web3 accounts based on smart audience,
     * measure real engagement vs. bot activity.
     *
     *
     *
     * **Usage Cost**: 5 points per request
     *
     * @summary Account Smart Engagement
     */
    SDK.prototype.getApiV3AccountsUsernameInfoSmart_engagement = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/info/smart_engagement/', 'get', metadata);
    };
    /**
     * **Description**: Provides **historical data** on the number of **smarts** (manually
     * curated by moderators) associated/interacted with a specific account.
     *
     *   -  **Graph-ready data** – structured for **date vs. smarts count** visualization.
     *
     *   -  **Smart change tracking** – see new additions & removals over time.
     *
     *   -  **Custom timeframes** – query by last **1H, 24H, 7D, 30D, 90D, 180D, or 1Y**.
     *
     *
     *
     * **Usage**: Use this endpoint to analyze long or short-term smarts attention growth
     * trends & dynamics. Build historical charts of smarts. Identify growth spikes & declines
     * over time. Compare smart trends across different timeframes.
     *
     *
     *
     * **Usage Cost**: 4 points per request
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Smarts History
     */
    SDK.prototype.getApiV3AccountsUsernameHistorySmarts_count = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/history/smarts_count/', 'get', metadata);
    };
    /**
     * **Description**: Provides **historical data** on the **total number of mentions** for a
     * specific account.
     *
     *   -  **Graph-ready data** – structured for **date vs. mention count** visualization.
     *
     *   -  **Change tracking** – see how mention frequency evolves over time.
     *
     *   -  **Custom timeframes** – query by last **1H, 24H, 7D, 30D, 90D, 180D, or 1Y**.
     *
     *
     *
     * **Usage**: Use this endpoint to analyze audience engagement trends and detect spikes in
     * attention. Build historical mention charts for tracking engagement. Identify sudden
     * spikes in visibility (viral moments, controversy, promotions). Compare mentions of
     * trends across different timeframes.
     *
     *
     *
     * **Usage Cost**: 2 points per request
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Mentions History
     */
    SDK.prototype.getApiV3AccountsUsernameHistoryMentions_count = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/history/mentions_count/', 'get', metadata);
    };
    /**
     * **Description**: Provides **historical data** on the number of **Smart Mentions** for a
     * specific account. These mentions come from **"smart" accounts**, manually curated by
     * moderators.
     *
     *   -  **Graph-ready data** – structured for **date vs. mention** count visualization.
     *
     *   -  **Smart mentions tracking** – see how often key accounts reference this profile.
     *
     *   -  **Custom timeframes** – query by last **1H, 24H, 7D, 30D, 90D, 180D, or 1Y**.
     *
     *
     *
     * **Usage**: Use this endpoint to analyze engagement from influential users and track
     * shifts in relevance within the smart audience. Monitor mentions from high-value, curated
     * accounts. Identify spikes in attention from smart users. Compare smart mentions across
     * different timeframes.
     *
     *
     *
     * **Usage Cost**: 4 points per request
     *
     *
     * **Timeframe**: The time range for the returned data. Possible values:
     * - `H1` - Last 1 hour
     *
     * - `H24` - Last 24 hours
     *
     * - `D7` - Last 7 days
     *
     * - `D30` - Last 30 days
     *
     * - `D90` - Last 90 days
     *
     * - `D180` - Last 180 days
     *
     * - `Y1` - Last 1 year
     *
     * @summary Smart Mentions History
     */
    SDK.prototype.getApiV3AccountsUsernameHistorySmart_mentions_count = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/history/smart_mentions_count/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves the complete list of smarts for a given specific account,
     * providing detailed information about each smart.
     *
     *   -  **Advanced analytics** – number of Smarts, Smart Mentions and **Moni score**.
     *
     *   -  **Blockchain & category tagging** – identifies the account’s connection to specific
     * blockchains and assigns tags from algorithm or manual classification by moderators &
     * tiers **(tier from 1 to 3)** smart is tagged and assigned by algorithm & moderators.
     *
     *
     *
     *  Order results by **interaction date, moni score or smarts count, category**. The
     * endpoint has **limits** – up to **100 Smarts in the list per request**.
     *
     *
     *
     * **Usage**: Use endpoint to retrieve detailed analytics on an account’s smarts. Filter &
     * sort smarts based on influence and engagement. Build custom leaderboards & audience
     * segmentation.
     *
     *
     *
     * **Usage Cost**: 5 points per request
     *
     * @summary Smarts Full Info
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsFull = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/full/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a list of all smarts** for a given specific account,
     * providing only basic profile data:
     *
     *   -  **Profile details** – ID.
     *
     *
     *
     * Order results by **interaction date, moni score or smarts count, category**. The
     * endpoint has **limits** – up to **100 Smarts in the list per request**.
     *
     *
     *
     * **Usage**: Use to fetch a simple list of smarts with key profile details. Filter & sort
     * smarts by relevance, growth, or influence. Use for quick lookups and bulk audience
     * processing.
     *
     *
     *
     * **Usage Cost**: 1 point per request
     *
     * @summary Smarts Metadata (ID)
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsMeta = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/meta/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a list of all Smarts** for a given specific account,
     * focusing on **tier classification and tagging**.
     *
     *  -  **Smart profile analysis** – internal ranking called **Smart Tier** of account
     * influence.
     *
     *  -  **Categorization & tags** – labels assigned algorithmically or manually from our
     * moderators.
     *
     *  -  **Blockchain affiliation** – blockchains associated with the account.
     *
     *  -  **Profile history** – number of bio updates as a signal of behavioral patterns.
     *
     * **Smart Tier** - is a rank assigned by Moni internal algorithm. There are three tiers
     * based on the "smart" account's rating tiers:
     *
     * 1 - 🧠
     *
     * 2 - 🧠🧠
     *
     * 3 - 🧠🧠🧠
     *
     * The higher the tier, the greater the account's influence on its audience.
     *
     *
     *
     * Order results by **interaction date, moni score or smarts count, category**. The
     * endpoint has **limits** – up to **100 Smarts in the list per request**.
     *
     *
     *
     * **Usage**: This endpoint is ideal for segmenting smarts based on influence and niche.
     * Retrieve tiered lists of smarts for influence analysis. Filter & sort smart by tags,
     * score, and engagement level. Use for audience segmentation and targeted outreach.
     *
     *
     *
     * **Usage Cost**: 1 point per request
     *
     * @summary Smarts Smart Profile
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsSmart_profile = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/smart_profile/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a list of all Smarts** for a given specific account,
     * focusing on **engagement and influence metrics of Smarts such as**:
     *
     *   -  **Smarts count** – how many "smart" users interacted with this account.
     *
     *   -  **Moni score** – our internal account score calculated based on smarts.
     *
     *   -  **Total mentions** – number of times the account was mentioned.
     *
     *   -  **Smart mentions** – how often it's mentioned by "smart" accounts.
     *
     *
     *
     * Order results by **interaction date, moni score, or category**. The endpoint has
     * **limits** – up to **100 Smarts in the list per request**. This endpoint is useful for
     * **analyzing the activity, relevance, and network strength of an account**.
     *
     *
     *
     * **Usage**: This endpoint is useful for analyzing the activity, relevance, and network
     * strength of an account. Use it to Identify highly engaged accounts based on their own
     * smart mentions &  smarts network. Use for targeted influencer analysis & outreach.
     *
     *
     *
     * **Usage Cost**: 3 points per request
     *
     * @summary Smarts Engagement
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsSmart_engagement = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/smart_engagement/', 'get', metadata);
    };
    /**
     * **Description**: Returns information about the tier distribution of Smarts for a
     * specific account. A "smart" account tier represents its level of influence on generating
     * attention toward a project, as determined by Moni's internal algorithm.
     *
     * There are three tiers based on the "smart" account's rating:
     *
     * 1 - 🧠
     *
     * 2 - 🧠🧠
     *
     * 3 - 🧠🧠🧠
     *
     * The higher the tier, the greater the account's influence on its audience.
     *
     *
     *
     * **Usage**: Use it to analyze the distribution of Tier 1, 2, and 3 smarts. Compare tier
     * distribution across multiple accounts. Observe changes in high-tier smarts over time.
     * Identify accounts with a strong base of high-tier smarts.
     *
     *
     *
     * **Usage Cost**: 1 point per request
     *
     * @summary Smarts Tiers
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsDistributionLevel = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/distribution/level/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves a list of categories associated with the smarts of a given
     * specific account, including the smarts count for each category.
     *
     *
     *
     * **Usage**: Use this endpoint to see which categories dominate an account’s smarts,
     * Identify if an account has more smarts in some specific category, benchmark category
     * distribution across multiple accounts.
     *
     *
     *
     * **Usage Cost**: 1 point per request
     *
     * @summary Smarts Categories
     */
    SDK.prototype.getApiV3AccountsUsernameSmartsCategories = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/smarts/categories/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a list of major events** related to a specific account,
     * tracking key changes in its activity such as:
     *
     *  -  **Bio updates** – name, description, or handle changes (`NEW_BIO`).
     *
     *  -  **Major events** – significant activities detected by Moni Discover
     * (`NEW_MAJOR_EVENT`)
     *
     * You can **filter events by type and date range**, as well as **sort them by time or
     * event category**. The endpoint has **limits** – up to **100 events in the list per
     * request**.
     *
     *
     *
     * **Usage**: This endpoint provides a timeline of key account updates, useful for tracking
     * activity trends and engagement shifts. Monitor profile updates & major activity changes
     * in real-time. Analyze historical events to detect good or bad behavioral patterns.
     *
     *
     *
     * **Usage Cost**: 3 points per request
     *
     * @summary Event List
     */
    SDK.prototype.getApiV3AccountsUsernameFeedEvents = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/feed/events/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a list of tweets mentioning a given account**, but **only
     * from smarts**.This endpoint helps analyze how high-quality Web3 participants interact
     * with an account and track narrative shifts among smart audiences. Filter tweets by date
     * range. The endpoint has **limits** – up to **100 tweets in the list per request**.
     *
     *
     *
     * **Usage**: Use to Monitor how smarts mention your account, Identify key influencers
     * talking about a project.
     *
     *
     *
     * **Usage Cost**: 4 points per request
     *
     * @summary Smart Mentions Feed
     */
    SDK.prototype.getApiV3AccountsUsernameFeedSmart_mentions = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/feed/smart_mentions/', 'get', metadata);
    };
    /**
     * **Description**: Retrieves **a complete list of indexed tweets** from a given specific
     * account feed.
     *
     *   -  **Tweet metadata** – ID.
     *
     *
     *
     * This endpoint provides full access to an account's historical tweets. You Filter tweets
     * by post IDs range. The endpoint has **limits** – up to **100 tweets in the list per
     * request.**
     *
     *
     *
     * ⚡ **Important**: To enable tweet indexing for an account, you must first send a **PUT
     * request** to `/api/v3/accounts/{username}/tracker/tweet/`.
     *
     *
     *
     * **Usage**: Use to Retrieve all indexed tweets from an account with engagement stats.
     * Analyze post performance based on likes, retweets, and views. Monitor historical tweet
     * activity for trend analysis. Extract useful tweet info to make better decisions.
     *
     *
     *
     * **Usage Cost**: 5 points per request
     *
     * @summary Full Feed Info
     */
    SDK.prototype.getApiV3AccountsUsernameFeedTweetsFull = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/feed/tweets/full/', 'get', metadata);
    };
    /**
     * **Description**: Returns the current status of your API key, including **usage limits,
     * computational points used, activity status, and expiration date**
     *
     *
     * **Usage**: Use to monitor your API key’s status and limits.
     *
     *
     * **Usage Cost**: free of charge
     *
     * @summary Api Key Status
     */
    SDK.prototype.getApiV3StatusApi_key = function (metadata) {
        return this.core.fetch('/api/v3/status/api_key/', 'get', metadata);
    };
    /**
     * **Description**: Returns the current status of API Server.
     *
     *
     * **Usage**: Use to check if the API server is up and running.
     *
     *
     * **Usage Cost**: free of charge
     *
     * @summary Server Status
     */
    SDK.prototype.getApiV3StatusServer = function () {
        return this.core.fetch('/api/v3/status/server/', 'get');
    };
    SDK.prototype.putApiV3AccountsUsernameTrackerTweet = function (body, metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/tracker/tweet/', 'put', body, metadata);
    };
    /**
     * **Description**: Stops the indexing of posts from an account.
     *
     *
     *
     * **Usage Cost**: free of charge
     *
     * @summary Stop Indexing
     */
    SDK.prototype.deleteApiV3AccountsUsernameTrackerTweet = function (metadata) {
        return this.core.fetch('/api/v3/accounts/{username}/tracker/tweet/', 'delete', metadata);
    };
    /**
     * **Description**: Returns the list of accounts where tweets indexing is active
     *
     *
     *
     * **Usage Cost**: free of charge
     *
     * @summary Indexing List
     */
    SDK.prototype.getApiV3AccountsTrackerTweet = function (metadata) {
        return this.core.fetch('/api/v3/accounts/tracker/tweet/', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
