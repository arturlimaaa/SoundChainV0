/**
 * soundChain API - Fastify server
 * Provides indexer proxy, ownership verification, and demo IPFS pinning
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import algosdk from 'algosdk';

const INDEXER_URL = process.env.INDEXER_URL || 'https://testnet-idx.algonode.cloud';

const fastify = Fastify({ logger: true });

// Register CORS
await fastify.register(cors, {
  origin: true
});

// Register Swagger / OpenAPI
await fastify.register(swagger, {
  openapi: {
    info: {
      title: 'soundChain API',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3001' }]
  }
});

await fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
});

/**
 * Health check endpoint
 */
fastify.get('/health', {
  schema: {
    tags: ['system'],
    summary: 'Health check',
    response: {
      200: {
        type: 'object',
        properties: { ok: { type: 'boolean' } },
        required: ['ok']
      }
    }
  }
}, async () => {
  return { ok: true };
});

/**
 * Proxy to Indexer for account holdings
 */
fastify.get<{
  Params: { address: string }
}>('/indexer/holdings/:address', {
  schema: {
    tags: ['indexer'],
    summary: 'Get account holdings from Indexer',
    params: {
      type: 'object',
      properties: { address: { type: 'string' } },
      required: ['address']
    },
    response: {
      200: { type: 'object', additionalProperties: true },
      400: {
        type: 'object',
        properties: { error: { type: 'string' } },
        required: ['error']
      }
    }
  }
}, async (request, reply) => {
  try {
    const { address } = request.params;

    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      return reply.code(400).send({ error: 'Invalid address format' });
    }

    const response = await fetch(`${INDEXER_URL}/v2/accounts/${address}`);

    if (!response.ok) {
      return reply.code(response.status).send({ error: 'Indexer request failed' });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
});

/**
 * Verify asset ownership
 */
fastify.post<{
  Body: { address: string; assetId: number }
}>('/verify/ownership', {
  schema: {
    tags: ['verification'],
    summary: 'Verify ASA ownership',
    body: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        assetId: { type: 'integer', minimum: 0 }
      },
      required: ['address', 'assetId']
    },
    response: {
      200: {
        type: 'object',
        properties: { owns: { type: 'boolean' } },
        required: ['owns']
      },
      400: {
        type: 'object',
        properties: { error: { type: 'string' } },
        required: ['error']
      }
    }
  }
}, async (request, reply) => {
  try {
    const { address, assetId } = request.body;

    // Validate inputs
    if (!algosdk.isValidAddress(address)) {
      return reply.code(400).send({ error: 'Invalid address format' });
    }

    if (!Number.isInteger(assetId) || assetId < 0) {
      return reply.code(400).send({ error: 'Invalid asset ID' });
    }

    // Query indexer for account assets
    const response = await fetch(`${INDEXER_URL}/v2/accounts/${address}/assets`);

    if (!response.ok) {
      return reply.code(500).send({ error: 'Failed to fetch account assets' });
    }

    const data = await response.json();
    const assets = data.assets || [];

    // Check if user owns the asset (amount > 0)
    const ownedAsset = assets.find((asset: any) =>
      asset['asset-id'] === assetId && asset.amount > 0
    );

    return { owns: !!ownedAsset };
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
});

/**
 * Demo IPFS pin endpoint (returns deterministic fake CID)
 */
fastify.post<{
  Body: { data: any }
}>('/ipfs/pin', {
  schema: {
    tags: ['ipfs'],
    summary: 'Demo IPFS pin (returns deterministic fake CID)',
    body: {
      type: 'object',
      properties: { data: {} },
      required: ['data']
    },
    response: {
      200: {
        type: 'object',
        properties: { cid: { type: 'string' } },
        required: ['cid']
      },
      400: {
        type: 'object',
        properties: { error: { type: 'string' } },
        required: ['error']
      }
    }
  }
}, async (request, reply) => {
  try {
    const { data } = request.body;

    if (!data) {
      return reply.code(400).send({ error: 'No data provided' });
    }

    // Generate deterministic fake CID based on data hash
    const dataString = JSON.stringify(data);
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataString));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Create fake IPFS CID format
    const fakeCid = `Qm${hashHex.substring(0, 44)}`;

    return { cid: fakeCid };
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
});

/**
 * Start server
 */
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 API server running on http://localhost:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
