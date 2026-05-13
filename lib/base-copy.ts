export type BaseTechnicalRow = {
  label: string;
  value: string;
  sub?: string;
};

export type BaseRiskCard = {
  ordinal: string;
  title: string;
  body: string;
  control: string;
};

export type BaseTimelineItem = {
  date: string;
  title: string;
  body: string;
};

export const baseCopy = {
  metadata: {
    title: "Base",
    description:
      "A technical brief on the relationship between the Lightra execution protocol and Base, Coinbase's Ethereum Layer 2, covering settlement mechanics, sequencer design, native USDC liquidity, PIOL reconciliation, latency budgets, and risk.",
  },
  cover: {
    titleLines: ["Base.", "L'infrastructure de", "liquidité décentralisée."],
    body:
      "This brief describes the architectural relationship between the Lightra execution protocol and Base, Coinbase's Ethereum Layer 2. It covers settlement mechanics, sequencer design, native USDC liquidity, the 250-millisecond execution budget, PIOL oracle anchoring, and the fault-proof window. It is written for engineers, allocators, and compliance officers who need to understand the infrastructure beneath the positions they hold or audit.",
    ctas: {
      read: "Lire le brief →",
      back: "Retour à Lightra ←",
    },
    strip: [
      { label: "RÉSEAU", value: "Base (Coinbase L2)" },
      { label: "BLOC", value: "2 secondes" },
      { label: "FINALITY", value: "~60 minutes (optimiste)" },
      { label: "STABLECOIN", value: "USDC natif" },
      { label: "ACCORD", value: "OP Stack · EVM-équivalent" },
      { label: "VERSION BRIEF", value: "2026.05" },
    ],
  },
  chapterMarks: {
    layerZero: { section: "§ 01", french: "Substrat", english: "Base from first principles" },
    settlement: { section: "§ 02", french: "Règlement", english: "settlement mechanics" },
    sequencer: { section: "§ 03", french: "Séquenceur", english: "the sequencer" },
    usdc: { section: "§ 04", french: "Liquidité", english: "native USDC" },
    execution: { section: "§ 05", french: "Exécution", english: "Lightra on Base" },
    reconciliation: { section: "§ 06", french: "Réconciliation", english: "the PIOL oracle on Base" },
    latency: { section: "§ 07", french: "Latence", english: "the 250-millisecond budget" },
    risk: { section: "§ 08", french: "Risque", english: "Base-specific risk surface" },
    roadmap: { section: "§ 09", french: "Trajectoire", english: "roadmap" },
    index: { section: "§ 10", french: "Index", english: "specifications and correspondence" },
  },
  illustrations: {
    baseLayerStack: {
      title: "Base layer stack",
      desc: "A three-band stack showing Ethereum L1 at the top, Base L2 in the middle, and the Lightra protocol at the bottom, with arrows indicating calldata, blobs, and EVM calls.",
      labels: {
        l1: "ETHEREUM L1",
        l2: "BASE L2",
        protocol: "LIGHTRA PROTOCOL",
        calldata: "CALLDATA / BLOBS",
        evm: "APPELS EVM",
        fault: "FAULT PROOF WINDOW · 7 JOURS",
        equivalence: "EVM-ÉQUIVALENT",
        contracts: [
          "FLASH",
          "ROUTER",
          "VAULT",
          "ORACLE",
          "FEES",
        ],
      },
    },
    sequencerFlow: {
      title: "Sequencer flow diagram",
      desc: "A vertical flow showing transaction submission through the public Base mempool to the Coinbase sequencer, then to L2 blocks, batch posting, and the Ethereum state root, with a dashed private Lightra channel bypassing the public mempool.",
      labels: {
        user: "TRANSACTION UTILISATEUR",
        mempool: "MEMPOOL BASE (PUBLIC)",
        privateLane: "CANAL PRIVÉ LIGHTRA",
        sequencer: "SÉQUENCEUR COINBASE",
        block: "BLOC L2",
        batch: "BATCH POSTING",
        root: "ÉTAT ROOT ETHEREUM",
      },
    },
    usdcFlow: {
      title: "USDC flow diagram",
      desc: "A two-path diagram comparing bridged USDC from Ethereum to Base with native USDC issued directly by Circle on Base.",
      labels: {
        bridged: "USDC PONTÉ (NON-NATIF)",
        ethereum: "ETHEREUM L1",
        bridge: "PONT",
        base: "BASE L2",
        native: "USDC NATIF",
        circle: "CIRCLE (ÉMETTEUR)",
      },
    },
    executionTimeline: {
      title: "Execution timeline",
      desc: "A horizontal timeline showing five contract-driven stages of a Lightra strategy execution on Base, totaling 250 milliseconds.",
      labels: [
        "DÉTECTION · 15ms",
        "CONSTRUCTION · 8ms",
        "SIMULATION · 55ms",
        "TRANSMISSION · 40ms",
        "INCLUSION · 120ms",
      ],
      total: "BUDGET TOTAL · 250ms · 1 BLOC BASE",
    },
    reconciliationLoop: {
      title: "Reconciliation loop",
      desc: "A circular flow from Base events through an indexer, MongoDB, PIOL, Snowflake, back to PIOL, then into attestation storage and the LightRain iOS application.",
      labels: {
        base: "BASE (ÉVÉNEMENT)",
        indexer: "INDEXEUR",
        mongo: "MONGODB",
        piol: "PIOL (QUORUM)",
        snowflake: "SNOWFLAKE (MODÈLE)",
        attestation: "ATTESTATION",
        reconciliations: "MONGODB (RÉCONCILIATIONS)",
        lightrain: "LIGHTRAIN (iOS)",
        latency: "<3 SECONDES · BOUT EN BOUT",
      },
    },
    faultProof: {
      title: "Fault proof schematic",
      desc: "A timeline from transaction submission to final Ethereum settlement, showing the seven-day challenge window and the point where Lightra operates.",
      labels: [
        "T=0 TRANSACTION",
        "T=2s CONFIRMATION DOUCE",
        "T=1-5min POSTING L1",
        "T=7j FIN FENÊTRE",
        "T=7j+ε FINALITÉ",
      ],
      challenge: "FENÊTRE DE DÉFI · 7 JOURS",
      final: "FINAL",
      lightra: "Lightra opère ici →",
    },
    latencyBudget: {
      title: "Latency budget bar",
      desc: "A stacked horizontal bar chart showing the execution budget for a Base strategy across seven time components totaling 250 milliseconds.",
      segments: [
        { label: "MEMPOOL · 5ms", ms: 5 },
        { label: "DÉCODAGE · 1ms", ms: 1 },
        { label: "DÉTECTION · 9ms", ms: 9 },
        { label: "CONSTRUCTION · 8ms", ms: 8 },
        { label: "SIMULATION · 55ms", ms: 55 },
        { label: "TRANSMISSION · 40ms", ms: 40 },
        { label: "INCLUSION · 120ms", ms: 120 },
      ],
      total: "250ms · 1 BLOC",
    },
  },
  sections: {
    layerZero: {
      headline: "A rollup is a promise. Base keeps it on Ethereum.",
      columns: [
        {
          eyebrow: "DÉFINITION",
          body:
            "Base is an Ethereum Layer 2 built on the OP Stack, the open-source rollup framework maintained by Optimism. It is an optimistic rollup: transactions execute off-chain under the assumption of validity, and their outputs are posted as compressed calldata to Ethereum mainnet. A challenge window of seven days allows any observer to submit a fault proof if the sequencer has acted dishonestly. After the window, the state root is final on L1.",
        },
        {
          eyebrow: "DÉRIVATION DE SÉCURITÉ",
          body:
            "Base inherits Ethereum's security not by replicating it but by posting its outputs to it. Every batch of Base transactions is compressed and written to an Ethereum blob or calldata slot. The data is therefore as durable as Ethereum itself — secured by the full weight of Ethereum's validator set, its economic finality, and its eleven-year operating history. An attacker who wants to corrupt a settled Base transaction must corrupt Ethereum.",
        },
        {
          eyebrow: "DIFFÉRENCIATION",
          body:
            "Base is operated by Coinbase, who acts as the sole sequencer and the canonical bridge operator. This creates a trust assumption that pure decentralized rollups do not have: users trust that Coinbase will not withhold transactions or post invalid state roots. Lightra's risk model prices this assumption explicitly. Coinbase's reputation, its regulatory status as a public company, and the economic cost of sequencer fraud are the three factors that make this trust assumption acceptable for institutional capital deployment.",
        },
      ],
      table: [
        { label: "Consensus", value: "Ethereum PoS (L1 anchor)" },
        { label: "Rollup type", value: "Optimistic · OP Stack" },
        { label: "Sequencer", value: "Coinbase, Inc." },
        { label: "Bloc L2", value: "2 secondes" },
        { label: "Data posting", value: "EIP-4844 blobs (Ethereum)" },
        { label: "EVM équivalence", value: "Type 2 · complète" },
      ] as BaseTechnicalRow[],
      footnote:
        "EVM Type 2 equivalence means Base executes identical bytecode to Ethereum mainnet. Lightra's contracts deploy without modification across both.",
    },
    settlement: {
      headline: "Optimistic by default. Provable on demand.",
      paragraphs: [
        "A user submits a transaction to the Base sequencer, the sequencer includes it in an L2 block within approximately 2 seconds, the block is returned to the user as a \"soft confirmation,\" and the sequencer periodically batches many L2 blocks together and posts a state root to Ethereum mainnet. The time between the soft confirmation and the Ethereum posting is typically between 1 and 5 minutes under normal conditions.",
        "For seven days after a state root is posted to Ethereum, any observer with access to Base's transaction history can run the OP Stack's fault proof program locally and submit a challenge if the state root is wrong. If no challenge succeeds within seven days, the state root is considered final on Ethereum and the funds associated with it can be withdrawn to L1 without further delay. This seven-day window is the price of optimistic security — it is why L2-to-L1 withdrawals take a week, and it is a deliberate architectural choice that trades speed for simplicity and auditability.",
        "For Lightra, the protocol's flash loans and credit positions operate entirely on L2 and never need to cross the bridge. The settlement guarantee that matters to Lightra is not L2-to-L1 finality but L2 soft confirmation — the 2-second block time. The 7-day fault proof window is a counterparty risk parameter for the bridge, not for in-protocol operations.",
      ],
      table: [
        { label: "Confirmation douce (L2)", value: "~2 secondes" },
        { label: "Posting état root (L1)", value: "1 — 5 minutes" },
        { label: "Fenêtre de défi", value: "7 jours" },
        { label: "Finalité L1", value: "7 jours + 1 bloc Ethereum" },
        { label: "Retrait L2 → L1", value: "7 jours minimum" },
      ] as BaseTechnicalRow[],
      footnote:
        "Lightra's positions are L2-native. The 7-day withdrawal window applies only to users bridging capital off Base to Ethereum mainnet, not to in-protocol credit or flash loan operations.",
    },
    sequencer: {
      headline: "One sequencer. Known. Accountable. Priced.",
      paragraphs: [
        "The sequencer is the node that receives user transactions, orders them, and produces L2 blocks. On Base, there is a single sequencer operated by Coinbase. This is the central trust assumption of the network. A centralized sequencer can, in theory, reorder transactions (MEV extraction), censor specific addresses, or go offline temporarily. It cannot steal user funds — because funds are secured by the L1 state root and the fault proof system — but it can withhold service.",
        "Coinbase's sequencer has maintained high uptime since Base's mainnet launch in August 2023. Historically the sequencer has processed over 99.9% of submitted transactions without reversion or delay. The sequencer does not currently implement mempool privacy or transaction ordering guarantees, which means a sophisticated observer can monitor the public mempool and front-run certain transaction types. Lightra addresses this by routing sensitive strategies through private submission channels rather than the public mempool.",
        "The OP Stack's roadmap includes sequencer decentralization — a future state where multiple sequencers compete to include transactions, reducing both MEV exposure and censorship risk. Base's current sequencer design is a deliberate temporal trade-off: centralization now for speed and simplicity, with a credible public commitment to decentralization as the stack matures. Lightra's risk model accounts for the current centralized state and will re-parameterize as decentralization occurs.",
        "Transaction ordering on Base follows a first-come-first-served model based on submission time to the sequencer, not on gas price priority fees. This is different from Ethereum mainnet, where priority fees drive transaction ordering. The implication for Lightra is that a well-connected node submitting a strategy transaction will not be outbid by a higher gas price from a competitor — speed of submission dominates, not gas economics.",
      ],
      table: [
        { label: "Opérateur", value: "Coinbase, Inc. (public co.)" },
        { label: "Uptime historique", value: ">99.9%" },
        { label: "Modèle d'ordonnancement", value: "FCFS · premier arrivé" },
        { label: "Mémoire tampon public", value: "Oui · non privé par défaut" },
        { label: "Canal privé Lightra", value: "Oui · submission directe" },
        { label: "Décentralisation prévue", value: "OP Stack roadmap · 2026-2027" },
      ] as BaseTechnicalRow[],
      footnote:
        "First-come-first-served ordering means Lightra's execution advantage is derived from node proximity and submission latency, not from gas auctions. This is a structural edge that cannot be replicated by capital alone.",
    },
    usdc: {
      headline: "Not bridged. Minted at the source.",
      paragraphs: [
        "USDC on Base is native — it is issued directly by Circle on the Base network, not bridged from Ethereum mainnet. The distinction matters because bridged USDC is a wrapped representation of mainnet USDC held in a bridge contract; native USDC is a canonical issuance by the regulatory-registered stablecoin issuer. Native USDC has no bridge risk, no de-pegging risk from bridge exploits, and can be redeemed directly with Circle from Base without routing through an L1 withdrawal.",
        "For Lightra's flash loan product, native USDC is the primary borrow and repay asset. The depth of native USDC liquidity on Base — consistently in excess of $1.5 billion across Aave v3 and Aerodrome pools — means the protocol can offer flash loan capacity that competes with any Ethereum mainnet equivalent, at a fraction of the gas cost. A flash loan of $2 million USDC on Base costs approximately $0.40 in gas. The same operation on Ethereum mainnet would cost between $8 and $40 depending on network congestion.",
        "For the credit vault, USDC is both a tier-one collateral asset and the preferred debt denomination. A borrower who posts WBTC as collateral and draws USDC as debt is operating in a regime where both assets have deep on-chain liquidity, both have reliable Chainlink oracle feeds, and the debt is denominated in a dollar-stable unit that eliminates currency risk on the debt side of the position.",
        "Circle's integration with the Coinbase ecosystem creates an additional layer of institutional comfort. Base's canonical USDC issuer and Base's canonical sequencer operator are affiliated entities. While this creates a concentration of trust, it also creates a single regulatory and reputational surface that sophisticated institutional counterparties find easier to evaluate than a fragmented multi-entity trust model.",
      ],
      table: [
        { label: "Émetteur", value: "Circle Internet Financial" },
        { label: "Type", value: "Natif · non-ponté" },
        { label: "Profondeur Aave v3", value: ">$1.5 Md" },
        { label: "Coût flash loan $2M", value: "~$0.40 (frais de gas)" },
        { label: "Rachat", value: "Directement via Circle" },
        { label: "Flux d'oracle", value: "Chainlink · mis à jour <1min" },
      ] as BaseTechnicalRow[],
      footnote:
        "Native USDC issuance on Base was confirmed by Circle in 2023. The on-chain contract address is verifiable against Circle's official attestation registry. Lightra's smart contracts reference this canonical address exclusively.",
    },
    execution: {
      headline: "Five contracts. One execution surface.",
      intro:
        "Lightra's protocol on Base consists of five deployed smart contracts, each with a single responsibility and no admin key. Together they form the execution surface through which flash loans are borrowed and repaid, strategies are routed, credit positions are opened and managed, fees are collected, and risk invariants are enforced. The contracts are EVM-compatible, audited, and non-upgradeable except through timelocked governance.",
      specs: [
        {
          label: "Flash Loan Executor",
          value:
            "Integrates Aave v3 on Base. Handles atomic borrow-execute-repay. Enforces the reentrancy guard and the strategy whitelist. Holds no funds between transactions.",
          address: "0x7a…e1f",
        },
        {
          label: "Strategy Router",
          value:
            "Routes capital across Base DEXes. Modular adapter architecture: Uniswap v3, Aerodrome, Curve on Base, Balancer, and custom pools. Enforces per-hop and aggregate slippage.",
          address: "0x3c…d44",
        },
        {
          label: "Credit Vault",
          value:
            "Holds collateral and tracks debt per position. Tiered collateral system with health factor monitoring, liquidation exposure, and reputation-weighted collateral factors.",
          address: "0x9f…b2e",
        },
        {
          label: "Reputation Oracle",
          value:
            "Tracks protocol-level address behavior. Computes on-chain reputation scores from attested inputs. Adjusts required collateral for high-reputation counterparties.",
          address: "0x1a…77c",
        },
        {
          label: "Fee Controller",
          value:
            "Collects protocol fees on every execution. Distributes yield to credit vault liquidity providers. Mints and burns lUSDC LP tokens. All splits governed by timelock.",
          address: "0x5e…f09",
        },
      ],
      table: [
        { label: "Flash Loan Executor", value: "Borrow · execute · repay", sub: "Non · timelock seulement" },
        { label: "Strategy Router", value: "Routage multi-DEX", sub: "Non · adapteurs modulaires" },
        { label: "Credit Vault", value: "Collatéral · dette", sub: "Non · paramètres via gov." },
        { label: "Reputation Oracle", value: "Score · attestation", sub: "Non · quorum 3/5" },
        { label: "Fee Controller", value: "Frais · LP tokens", sub: "Non · splits via timelock" },
      ] as BaseTechnicalRow[],
    },
    reconciliation: {
      headline: "Every event on Base, attested off it.",
      codes: ["MongoDB", "Snowflake", "LightRain"],
      paragraphs: [
        "PIOL — the Proof of Integrity and Off-chain Linkage oracle — is the reconciliation layer that sits between Base and the LightRain observability application. Its job is to take every significant financial event that occurs on Base (a flash loan, a credit drawdown, a liquidation, a fee settlement) and produce a signed attestation confirming that the observed outcome is consistent with the modeled expectation from Snowflake's risk models.",
        "PIOL works by subscribing to Base's event logs in real time through an archive node. Each event is decoded against the Lightra contract ABIs, producing a structured record. The record is then matched against the strategy specification stored in MongoDB (what was supposed to happen) and the risk model output from Snowflake (what the model predicted would happen). The divergence between observed and predicted is the reconciliation delta. PIOL signs an attestation containing the event hash, the delta, and a confidence score, using a quorum of five attesters of which at least three must sign.",
        "The attestation is published to MongoDB's reconciliation collection, where LightRain reads it within seconds of production. The user of LightRain never sees raw Base data — they see PIOL-attested truth states. This means a corrupted or replayed event on Base cannot propagate to the observability layer without first passing through the attestation filter. A compromised attester can refuse to sign or sign maliciously, but the quorum requirement prevents a single point of failure.",
        "The reconciliation loop runs continuously, with a target latency from on-chain event to signed attestation of under three seconds under normal load. Events are queued when PIOL is under load, ensuring no event is lost, but the latency bound is a service-level target rather than a cryptographic guarantee.",
      ],
      table: [
        { label: "Source d'événements", value: "Base · logs EVM · archive node" },
        { label: "Décodage ABI", value: "Contrats Lightra · 5 interfaces" },
        { label: "Référence modèle", value: "Snowflake · mart 15 min" },
        { label: "Quorum signatures", value: "3 sur 5 attesteurs" },
        { label: "Latence cible bout-en-bout", value: "<3 secondes" },
        { label: "Volume traité", value: ">18 000 réconciliations / jour" },
      ] as BaseTechnicalRow[],
      footnote:
        "The attestation is not a zero-knowledge proof. It is a multi-party signature over a structured reconciliation record. The distinction matters: PIOL provides auditability and fraud detection, not cryptographic execution privacy.",
    },
    latency: {
      headline: "One block. Two hundred fifty milliseconds. No margin for waste.",
      columns: [
        {
          eyebrow: "OBSERVATION (15ms)",
          body:
            "The execution bot maintains a persistent WebSocket to Base's sequencer via a co-located Hetzner node. New transactions appear in the mempool within 5–15 milliseconds of broadcast. The observation pipeline decodes incoming transactions against Lightra's strategy heuristics in under 1 millisecond per transaction using a compiled ABI decoder. The total observation budget is 15 milliseconds, and it is typically consumed in full during high-mempool-activity periods.",
        },
        {
          eyebrow: "SIMULATION (55ms)",
          body:
            "Before submission, every strategy transaction is simulated against a forked snapshot of Base's current state using a local Erigon node. The simulation produces the expected P&L, gas consumption, slippage per hop, and post-execution state. If the simulation's realized P&L net of gas and fees is below the strategy's minimum threshold, the transaction is discarded. Simulation is the largest single consumer of the execution budget at 55 milliseconds, and it is the component most sensitive to RPC latency and local node performance.",
        },
        {
          eyebrow: "INCLUSION (120ms)",
          body:
            "After a transaction is submitted to the sequencer, inclusion in the next L2 block takes approximately 120 milliseconds under normal conditions — roughly half the 2-second block interval, since the submission arrives at a random point in the block production cycle and must wait for the current block to close. This 120ms is not controllable by the protocol; it is a function of Base's block time. Lightra's co-location strategy minimizes transmission latency to keep the controllable portion of the budget as small as possible, reserving more of the 250ms for simulation fidelity.",
        },
      ],
      table: [
        { label: "Latence mempool", value: "5 ms", sub: "Non · réseau P2P" },
        { label: "Décodage ABI", value: "1 ms", sub: "Non · processeur" },
        { label: "Détection opportunité", value: "9 ms", sub: "Oui · algorithme" },
        { label: "Construction transaction", value: "8 ms", sub: "Oui · optimisation" },
        { label: "Simulation (Erigon local)", value: "55 ms", sub: "Oui · infra" },
        { label: "Transmission séquenceur", value: "40 ms", sub: "Oui · co-location" },
        { label: "Inclusion bloc L2", value: "120 ms", sub: "Non · Base séquenceur" },
        { label: "TOTAL", value: "238 ms", sub: "—" },
      ] as BaseTechnicalRow[],
      footnote:
        "The 12ms buffer between the 238ms sum and the 250ms budget is deliberate. When mempool activity spikes, observation latency can reach 20ms. The buffer absorbs the spike without pushing the total past one block. Strategies with narrower opportunity windows are configured with tighter per-component budgets.",
    },
    risk: {
      headline: "Six vectors. Priced and managed.",
      cards: [
        {
          ordinal: "I",
          title: "Risque séquenceur",
          body:
            "Coinbase operates the sole sequencer. Sequencer downtime produces delayed confirmation but not fund loss. Sequencer censorship is theoretically possible but publicly observable and economically costly for a regulated public company. Lightra prices this as operational risk, not systemic risk.",
          control: "CONTRÔLE · canal privé · monitoring uptime 24/7",
        },
        {
          ordinal: "II",
          title: "Fenêtre de fault proof",
          body:
            "The 7-day optimistic challenge window means L2→L1 bridge withdrawals are slow. Lightra's protocol is L2-native and never requires bridge crossings during normal operation. The risk activates only in a worst-case protocol wind-down scenario.",
          control: "CONTRÔLE · L2-natif · pas de dépendance pont",
        },
        {
          ordinal: "III",
          title: "Manipulation d'oracle",
          body:
            "Price feeds on Base are sourced from Chainlink's native Base deployment and verified against Uniswap v3 TWAPs at 30-minute intervals. A single oracle manipulation within a transaction cannot persist across two independent sources with different time windows.",
          control: "CONTRÔLE · Chainlink ∩ TWAP · rejet si écart >50bps",
        },
        {
          ordinal: "IV",
          title: "Exposition MEV",
          body:
            "Base's FCFS ordering reduces priority-fee-based MEV. Lightra routes sensitive strategies through the private submission channel to the sequencer, bypassing the public mempool entirely. Residual MEV risk exists from sandwich attacks on in-flight public transactions; these are mitigated by tight per-hop slippage limits.",
          control: "CONTRÔLE · FCFS · canal privé · slippage <15bps",
        },
        {
          ordinal: "V",
          title: "Risque de liquidité",
          body:
            "Flash loan capacity on Base depends on the liquidity depth of Aave v3 and Aerodrome pools. A sudden withdrawal of liquidity — during a market crisis or a large LP exit — reduces available flash loan notional. Lightra monitors pool depth in real time and enforces a maximum-size-to-pool-depth ratio.",
          control: "CONTRÔLE · ratio taille/profondeur · monitoring temps réel",
        },
        {
          ordinal: "VI",
          title: "Mise à niveau du protocole",
          body:
            "Base's OP Stack fork has been upgraded three times since mainnet launch. Each upgrade carries smart contract compatibility risk. Lightra monitors OP Stack governance and maintains a 14-day upgrade simulation window before any Base network upgrade that could affect deployed contracts.",
          control: "CONTRÔLE · fenêtre simulation 14j · timelock gouvernance",
        },
      ] as BaseRiskCard[],
      table: [
        { label: "Séquenceur", value: "Observable · centralisé", sub: "Canal privé + monitoring" },
        { label: "Bridge window", value: "7 jours", sub: "Aucun besoin en régime normal" },
        { label: "Oracle integrity", value: "Chainlink ∩ TWAP", sub: "Rejet si divergence >50bps" },
        { label: "MEV", value: "Réduit par FCFS", sub: "Canal privé + slippage caps" },
        { label: "Liquidity depth", value: "Temps réel", sub: "Ratio taille/profondeur imposé" },
        { label: "Upgrade risk", value: "Fenêtre 14j", sub: "Simulation avant upgrade Base" },
      ] as BaseTechnicalRow[],
      citation: "« Le risque non nommé est le seul risque non géré. »",
    },
    roadmap: {
      headline: "Base in motion. Lightra in parallel.",
      headings: {
        base: "BASE ROADMAP",
        lightra: "LIGHTRA EXPANSION",
      },
      base: [
        {
          date: "2023 Q3",
          title: "Mainnet launch.",
          body:
            "Base deployed to public mainnet with Coinbase as sole sequencer. Native USDC confirmed as canonical stablecoin.",
        },
        {
          date: "2024 Q1",
          title: "EIP-4844 blob support.",
          body:
            "Base integrated blob transactions, reducing data posting costs by roughly 80 percent and enabling lower fees for users and protocols.",
        },
        {
          date: "2024 Q3",
          title: "Fault proof activation.",
          body:
            "The OP Stack's permissioned fault proof system was activated on Base, removing reliance on a security council for final dispute resolution.",
        },
        {
          date: "2025 Q2",
          title: "Permissionless fault proofs.",
          body:
            "The fault proof system became fully permissive — any observer can submit a challenge without a whitelist. This removed the last centralized override in the settlement stack.",
        },
        {
          date: "2026",
          title: "Sequencer decentralization (roadmap).",
          body:
            "The OP Stack's based rollup design is targeted for Base, enabling multiple sequencers competing under a neutral ordering mechanism.",
        },
        {
          date: "2027",
          title: "Stage 2 rollup (target).",
          body:
            "Full decentralization of the sequencer and the governance system, qualifying Base as a Stage 2 rollup under L2Beat's classification.",
        },
      ] as BaseTimelineItem[],
      lightra: [
        {
          date: "2023 Q4",
          title: "Base integration design.",
          body:
            "Lightra's architecture is specified for Base as primary execution layer. Smart contracts designed for OP Stack EVM.",
        },
        {
          date: "2024 Q2",
          title: "Mainnet protocol deployment.",
          body:
            "Flash loan executor and strategy router deployed. Initial flash loan volume through Aave v3 on Base.",
        },
        {
          date: "2024 Q4",
          title: "Credit vault launch.",
          body:
            "Credit vault and reputation oracle deployed. First institutional credit lines extended.",
        },
        {
          date: "2025 Q2",
          title: "PIOL oracle live.",
          body:
            "Reconciliation layer deployed. LightRain iOS application enters TestFlight. Institutional alpha with 12 counterparties.",
        },
        {
          date: "2026 Q1",
          title: "Current state.",
          body:
            "$1.84 billion notional reconciled. 1,207 credit lines active. LightRain in public institutional distribution.",
        },
        {
          date: "2026 Q4 (planned)",
          title: "Arbitrum expansion.",
          body:
            "Flash loan executor deployed on Arbitrum for strategies requiring Aave mainnet-class liquidity depth. PIOL extended to cover cross-chain reconciliation.",
        },
        {
          date: "2027 (planned)",
          title: "Solana execution surface.",
          body:
            "Independent execution engine for high-frequency strategies on Solana. Reputation oracle extended to cover cross-chain address history.",
        },
      ] as BaseTimelineItem[],
      table: [
        { label: "EIP-4844 blobs", value: "Actif", sub: "−80% coûts de données" },
        { label: "Fault proofs permissifs", value: "Actif", sub: "Risque séquenceur reclassifié" },
        { label: "Décentralisation séquenceur", value: "2026 roadmap", sub: "Re-paramétrage MEV prévu" },
        { label: "Stage 2 rollup", value: "2027 cible", sub: "Mise à jour modèle de risque" },
      ] as BaseTechnicalRow[],
    },
    index: {
      headline: "Le dossier complet.",
      headings: {
        toc: "CE DOCUMENT",
        base: "RÉFÉRENCES BASE",
        lightra: "RÉFÉRENCES LIGHTRA",
        correspondence: "CORRESPONDANCE",
      },
      toc: [
        { label: "§ 01 — Base depuis les premiers principes", href: "#base-from-first-principles" },
        { label: "§ 02 — Mécanique de règlement", href: "#settlement-mechanics" },
        { label: "§ 03 — Le séquenceur", href: "#sequencer" },
        { label: "§ 04 — USDC natif", href: "#native-usdc" },
        { label: "§ 05 — Lightra sur Base", href: "#lightra-on-base" },
        { label: "§ 06 — Oracle PIOL et Base", href: "#piol-on-base" },
        { label: "§ 07 — Latence et budget temps", href: "#latency-budget" },
        { label: "§ 08 — Surface de risque Base", href: "#base-risk" },
        { label: "§ 09 — Feuille de route Base", href: "#roadmap" },
      ],
      referencesBase: [
        { label: "Base whitepaper", href: "https://docs.base.org" },
        { label: "OP Stack documentation", href: "https://stack.optimism.io" },
        { label: "Ethereum EIP-4844 specification", href: "https://eips.ethereum.org/EIPS/eip-4844" },
        { label: "Chainlink oracle documentation on Base", href: "https://docs.chain.link" },
        { label: "Circle USDC on Base", href: "https://www.circle.com" },
        { label: "BaseScan contract explorer", href: "https://basescan.org" },
        { label: "L2Beat Base risk profile", href: "https://l2beat.com" },
        { label: "Coinbase sequencer status page", href: "https://status.coinbase.com" },
        { label: "Base bridge documentation", href: "https://bridge.base.org" },
        { label: "OP Mainnet fault proof audit", href: "https://github.com/ethereum-optimism" },
      ],
      referencesLightra: [
        { label: "Lightra whitepaper", href: "/contact" },
        { label: "Flash loan executor specification", href: "/contact" },
        { label: "Strategy router architecture", href: "/contact" },
        { label: "Credit vault specification", href: "/contact" },
        { label: "Reputation oracle methodology", href: "/contact" },
        { label: "PIOL oracle design", href: "/contact" },
        { label: "Fee controller documentation", href: "/contact" },
        { label: "Lightra smart contract deployment index", href: "/contact" },
        { label: "LightRain iOS specification", href: "/contact" },
        { label: "PIOL attestation format", href: "/contact" },
      ],
      correspondence: [
        { label: "institutions@lightra.in", href: "mailto:institutions@lightra.in" },
        { label: "security@lightra.in", href: "mailto:security@lightra.in" },
        { label: "legal@lightra.in", href: "mailto:legal@lightra.in" },
        { label: "press@lightra.in", href: "mailto:press@lightra.in" },
        { label: "disclosure@lightra.in", href: "mailto:disclosure@lightra.in" },
      ],
      table: [
        { label: "BRIEF VERSION", value: "2026.05", sub: "Statique · export compatible" },
        { label: "AUDIENCE", value: "Engineers · allocators · compliance", sub: "Graduate-level technical reader" },
        { label: "SURFACE", value: "Base L2 · PIOL · Lightra", sub: "Settlement, execution, risk" },
        { label: "CONTACT", value: "institutions@lightra.in", sub: "Disclosure routed by desk" },
      ] as BaseTechnicalRow[],
      close: "« L'infrastructure n'est pas visible. Son absence l'est toujours. »",
    },
  },
} as const;

export type BaseCopy = typeof baseCopy;
