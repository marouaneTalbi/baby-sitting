<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241004082944 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE availability_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE profile_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE availability (id INT NOT NULL, user_id_id INT DEFAULT NULL, day_of_week VARCHAR(255) DEFAULT NULL, start_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3FB7A2BF9D86650F ON availability (user_id_id)');
        $this->addSql('CREATE TABLE booking (id INT NOT NULL, parent_id_id INT DEFAULT NULL, service_provider_id_id INT DEFAULT NULL, service_id_id INT DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, start_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, status VARCHAR(255) NOT NULL, create_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E00CEDDEB3750AF4 ON booking (parent_id_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDE25747695 ON booking (service_provider_id_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDED63673B0 ON booking (service_id_id)');
        $this->addSql('COMMENT ON COLUMN booking.create_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE profile (id INT NOT NULL, user_id_id INT DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, rate_per_hour VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8157AA0F9D86650F ON profile (user_id_id)');
        $this->addSql('COMMENT ON COLUMN profile.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, parent_id_id INT DEFAULT NULL, services_provider_id_id INT DEFAULT NULL, rating VARCHAR(255) DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_794381C6B3750AF4 ON review (parent_id_id)');
        $this->addSql('CREATE INDEX IDX_794381C66877AEFD ON review (services_provider_id_id)');
        $this->addSql('COMMENT ON COLUMN review.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE user_service (id INT NOT NULL, user_id_id INT DEFAULT NULL, service_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B99084D89D86650F ON user_service (user_id_id)');
        $this->addSql('CREATE INDEX IDX_B99084D8ED5CA9E6 ON user_service (service_id)');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT FK_3FB7A2BF9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEB3750AF4 FOREIGN KEY (parent_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE25747695 FOREIGN KEY (service_provider_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDED63673B0 FOREIGN KEY (service_id_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0F9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6B3750AF4 FOREIGN KEY (parent_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C66877AEFD FOREIGN KEY (services_provider_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_service ADD CONSTRAINT FK_B99084D89D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_service ADD CONSTRAINT FK_B99084D8ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE service ADD description VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD role VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE availability_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE profile_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_service_id_seq CASCADE');
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT FK_3FB7A2BF9D86650F');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEB3750AF4');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE25747695');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDED63673B0');
        $this->addSql('ALTER TABLE profile DROP CONSTRAINT FK_8157AA0F9D86650F');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C6B3750AF4');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C66877AEFD');
        $this->addSql('ALTER TABLE user_service DROP CONSTRAINT FK_B99084D89D86650F');
        $this->addSql('ALTER TABLE user_service DROP CONSTRAINT FK_B99084D8ED5CA9E6');
        $this->addSql('DROP TABLE availability');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE profile');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE user_service');
        $this->addSql('ALTER TABLE service DROP name');
        $this->addSql('ALTER TABLE service DROP description');
        $this->addSql('ALTER TABLE "user" DROP role');
        $this->addSql('ALTER TABLE "user" DROP password');
        $this->addSql('ALTER TABLE "user" DROP created_at');
    }
}
