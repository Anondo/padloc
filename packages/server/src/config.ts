import { Config, ConfigParam } from "@padloc/core/src/config";
import { ServerConfig } from "@padloc/core/src/server";
import { FSAttachmentStorageConfig } from "./attachments/fs";
import { S3AttachmentStorageConfig } from "./attachments/s3";
import { SMTPConfig } from "./email/smtp";
import { WebAuthnConfig } from "./auth/webauthn";
import { LevelDBStorageConfig } from "./storage/leveldb";
import { MongoDBStorageConfig } from "./storage/mongodb";
import { AuthType } from "@padloc/core/src/auth";
import { OpenIdConfig } from "./auth/openid";
import { TotpAuthConfig } from "@padloc/core/src/auth/totp";

export class EmailConfig extends Config {
    constructor(init: Partial<EmailConfig> = {}) {
        super();
        Object.assign(this, init);
    }

    @ConfigParam()
    backend: "smtp" | "console" = "console";

    @ConfigParam(SMTPConfig)
    smtp?: SMTPConfig;
}

export class DataStorageConfig extends Config {
    constructor(init: Partial<DataStorageConfig> = {}) {
        super();
        Object.assign(this, init);
    }

    @ConfigParam()
    backend: "void" | "memory" | "leveldb" | "mongodb" = "leveldb";

    @ConfigParam(LevelDBStorageConfig)
    leveldb?: LevelDBStorageConfig;

    @ConfigParam(MongoDBStorageConfig)
    mongodb?: MongoDBStorageConfig;
}

export class AttachmentStorageConfig extends Config {
    constructor(init: Partial<AttachmentStorageConfig> = {}) {
        super();
        Object.assign(this, init);
    }

    @ConfigParam()
    backend: "memory" | "fs" | "s3" = "memory";

    @ConfigParam(FSAttachmentStorageConfig)
    fs?: FSAttachmentStorageConfig;

    @ConfigParam(S3AttachmentStorageConfig)
    s3?: S3AttachmentStorageConfig;
}

export class LoggingConfig extends Config {
    constructor(init: Partial<LoggingConfig> = {}) {
        super();
        Object.assign(this, init);
    }

    @ConfigParam(DataStorageConfig)
    storage = new DataStorageConfig();
}

export class AuthConfig extends Config {
    @ConfigParam("string[]")
    types: AuthType[] = [AuthType.Email, AuthType.Totp];

    @ConfigParam(EmailConfig)
    email?: EmailConfig;

    @ConfigParam(WebAuthnConfig)
    webauthn?: WebAuthnConfig;

    @ConfigParam(TotpAuthConfig)
    totp?: TotpAuthConfig;

    @ConfigParam(OpenIdConfig)
    openid?: OpenIdConfig;
}

export class PadlocConfig extends Config {
    constructor(init: Partial<PadlocConfig> = {}) {
        super();
        Object.assign(this, init);
    }

    @ConfigParam(ServerConfig)
    server = new ServerConfig();

    @ConfigParam(EmailConfig)
    email = new EmailConfig();

    @ConfigParam(DataStorageConfig)
    data = new DataStorageConfig();

    @ConfigParam(AttachmentStorageConfig)
    attachments = new AttachmentStorageConfig();

    @ConfigParam(LoggingConfig)
    logging = new LoggingConfig({ storage: new DataStorageConfig({ backend: "void" }) });

    @ConfigParam(AuthConfig)
    auth = new AuthConfig();
}

export function getConfig() {
    return new PadlocConfig().fromEnv(process.env as { [v: string]: string }, "PL_");
}