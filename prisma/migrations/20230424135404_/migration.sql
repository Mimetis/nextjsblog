BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Recipes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Recipes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [title] VARCHAR(250) NOT NULL,
    [slug] VARCHAR(100) NOT NULL,
    [description] VARCHAR(max),
    [recipe] VARCHAR(max),
    [ingredients] VARCHAR(max),
    [calories] INT,
    [time] VARCHAR(250),
    [type] VARCHAR(100),
    [pictureUrl] VARCHAR(250),
    [thumbnailUrl] VARCHAR(250),
    [blurDataUrl] VARCHAR(250),
    [published] BIT NOT NULL CONSTRAINT [Recipes_published_df] DEFAULT 0,
    [authorId] VARCHAR(12) NOT NULL,
    CONSTRAINT [Recipes_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Recipes_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] VARCHAR(12) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(250),
    [pictureUrl] VARCHAR(250),
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Favorites] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] VARCHAR(12) NOT NULL,
    [recipeId] INT NOT NULL,
    CONSTRAINT [Favorites_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Favorites_userId_recipeId_key] UNIQUE NONCLUSTERED ([userId],[recipeId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Recipes] ADD CONSTRAINT [Recipes_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [Favorites_recipeId_fkey] FOREIGN KEY ([recipeId]) REFERENCES [dbo].[Recipes]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [Favorites_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
