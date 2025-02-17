import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { InstallationMedia } from "../models/models_0";
import { ImportInstallationMediaMessage } from "../models/models_1";
import {
  deserializeAws_queryImportInstallationMediaCommand,
  serializeAws_queryImportInstallationMediaCommand,
} from "../protocols/Aws_query";
import { RDSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RDSClient";

export interface ImportInstallationMediaCommandInput extends ImportInstallationMediaMessage {}
export interface ImportInstallationMediaCommandOutput extends InstallationMedia, __MetadataBearer {}

/**
 * <p>Imports the installation media for a DB engine that requires an on-premises
 *           customer provided license, such as SQL Server.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { RDSClient, ImportInstallationMediaCommand } from "@aws-sdk/client-rds"; // ES Modules import
 * // const { RDSClient, ImportInstallationMediaCommand } = require("@aws-sdk/client-rds"); // CommonJS import
 * const client = new RDSClient(config);
 * const command = new ImportInstallationMediaCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ImportInstallationMediaCommandInput} for command's `input` shape.
 * @see {@link ImportInstallationMediaCommandOutput} for command's `response` shape.
 * @see {@link RDSClientResolvedConfig | config} for RDSClient's `config` shape.
 *
 */
export class ImportInstallationMediaCommand extends $Command<
  ImportInstallationMediaCommandInput,
  ImportInstallationMediaCommandOutput,
  RDSClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ImportInstallationMediaCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RDSClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ImportInstallationMediaCommandInput, ImportInstallationMediaCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RDSClient";
    const commandName = "ImportInstallationMediaCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ImportInstallationMediaMessage.filterSensitiveLog,
      outputFilterSensitiveLog: InstallationMedia.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ImportInstallationMediaCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_queryImportInstallationMediaCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ImportInstallationMediaCommandOutput> {
    return deserializeAws_queryImportInstallationMediaCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
